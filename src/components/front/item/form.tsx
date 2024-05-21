"use client";

import { db } from "@/lib/kysely";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PencilIcon, PlusIcon } from "lucide-react";
import * as z from "zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useEdgeStore } from "@/lib/edgestore";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { InputField, InputFileField, TextareaField, CheckBoxField, RadioGroupField } from "@/components/form";
import type { TicketItem } from "@/types/ticket";
import { useUser } from "@clerk/nextjs";
import { generateUUID } from "@/lib/string";

type NewItemFormProps = {
  type: "new";
  item?: null;
};
type EditItemFormProps = {
  type: "edit";
  item: TicketItem;
};
type ItemFormProps = NewItemFormProps | EditItemFormProps;

type TicketTypes = "sell" | "buy";
type TicketCategories = "Concert" | "Camping" | "Fansign" | "Restaurant" | "Hotel";

const ticketTypes: { label: string; value: TicketTypes }[] = [
  { label: "팝니다", value: "sell" },
  { label: "삽니다", value: "buy" },
];
const ticketCategories: { label: string; value: TicketCategories }[] = [
  { label: "콘서트", value: "Concert" },
  { label: "캠핑", value: "Camping" },
  { label: "팬싸인", value: "Fansign" },
  { label: "식당", value: "Restaurant" },
  { label: "호텔", value: "Hotel" },
];

const formSchema = z.object({
  ticket_type: z.enum(ticketTypes.map((item) => item.value) as unknown as readonly [string, ...TicketTypes[]], {
    required_error: "티켓 타입을 선택해주세요",
  }),
  category: z.enum(ticketCategories.map((item) => item.value) as unknown as readonly [string, ...TicketCategories[]], {
    required_error: "카테고리를 선택해주세요",
  }),
  title: z
    .string({ required_error: "제목을 입력해주세요" })
    .min(4, { message: "제목은 4글자 이상 30글자 미만으로 입력해주세요" })
    .max(30, { message: "제목은 4글자 이상 30글자 미만으로 입력해주세요" }),
  description: z
    .string()
    .min(2, { message: "설명을 2자 이상, 2000자 이하로 입력해주세요" })
    .max(2000, { message: "설명을 2자 이상, 2000자 이하로 입력해주세요" }),
});
type FormSchema = z.infer<typeof formSchema>;

export function ItemForm({ type, item }: ItemFormProps) {
  const { isSignedIn, user, isLoaded } = useUser();
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string | null>(type === "edit" ? item.image_url || null : null);
  const { edgestore } = useEdgeStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticket_type: type === "edit" ? item.ticket_type : undefined,
      category: type === "edit" ? item.category : undefined,
      title: type === "edit" ? item.title : "",
      description: type === "edit" ? item.description : "",
    },
  });

  if (!isLoaded) {
    return null;
  }

  const submitAdd = async (data: FormSchema) => {
    const user_id = user!.primaryEmailAddress!.id;
    const user_email = user!.primaryEmailAddress!.emailAddress;
    // console.log(user);
    // const result = await db
    //   .insertInto("Ticket")
    //   .values({
    //     id: generateUUID(),
    //     user_id: user_email,
    //     ticket_type: data.ticket_type,
    //     category: data.category,
    //     title: data.title,
    //     description: data.description,
    //     image_url: imageUrl || null,
    //     status: "Available",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   })
    //   .execute();
    // console.log(result);
  };
  const submitEdit = async (data: FormSchema) => {
    // 수정에 대한 쿼리 필요
  };

  const submit: SubmitHandler<FormSchema> = async (data) => {
    startTransition(async () => {
      if (type === "new") {
        await submitAdd(data);
      } else if (type === "edit") {
        await submitEdit(data);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="w-full py-2 space-y-4 rounded">
        <RadioGroupField
          form={form}
          name="ticket_type"
          label="타입을 선택해주세요"
          groupItems={ticketTypes}
          onDevelop
        />
        <RadioGroupField
          form={form}
          name="category"
          label="카테고리를 선택해주세요"
          groupItems={ticketCategories}
          onDevelop
        />
        <InputField
          form={form}
          name="title"
          label="제목"
          description="제목을 입력해주세요"
          inputProps={{
            placeholder: "제목을 입력해주세요",
          }}
        />
        <TextareaField
          form={form}
          name="description"
          label="내용"
          description="내용을 입력해주세요"
          textareaProps={{}}
        />
        <div>
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files?.[0]);
              setFile(e.target.files?.[0]);
            }}
          />
          <Button
            type="button"
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    // you can use this to show a progress bar
                    console.log(progress);
                  },
                });
                // you can run some server action or api here
                // to add the necessary data to your database
                console.log(res);
                console.log(res.url);
                setImageUrl(res.url);
              }
            }}
          >
            Upload
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8">
          <Button type="submit" size="lg" className="gap-2 w-full sm:w-fit" pending={isPending}>
            {type === "new" && (
              <>
                <PlusIcon size={14} />
                등록
              </>
            )}
            {type === "edit" && (
              <>
                <PencilIcon size={14} />
                수정
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={() => route.back()}>
            뒤로
          </Button>
        </div>
      </form>
    </Form>
  );
}
