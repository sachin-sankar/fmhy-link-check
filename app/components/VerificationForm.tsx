import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  Textarea,
  Checkbox,
  Select,
  Button,
  Stack,
  Radio,
  Group,
} from "@mantine/core";
import { z } from "zod";

const verificationFormSchema = z.object({
  contentQuality: z.enum(["High", "Medium", "Low"]).optional(),
  category: z
    .enum(["News", "Education", "Entertainment", "E-commerce"])
    .optional(),
  accessType: z.enum(["Free", "Paid"]).default("Free"),
  registrationRequired: z.boolean().default(false),
  descriptionAndNotes: z.string().optional(),
  socialLinks: z.object({
    discordLink: z.string().url().optional(),
    telegramLink: z.string().url().optional(),
    otherSocialLink: z.string().url().optional(),
  }),
  verificationNotes: z.string().optional(),
  approvalDecision: z
    .enum(["Approve", "Reject", "Needs Verification"])
    .optional(),
});

const categories = [
  { value: "News", label: "News" },
  { value: "Education", label: "Education" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "E-commerce", label: "E-commerce" },
];

const contentQualities = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

function VerificationForm() {
  const form = useForm({
    initialValues: {
      contentQuality: undefined,
      category: undefined,
      accessType: "Free",
      registrationRequired: false,
      descriptionAndNotes: "",
      socialLinks: {
        discordLink: "",
        telegramLink: "",
        otherSocialLink: "",
      },
      verificationNotes: "",
      approvalDecision: undefined,
    },
    validate: zodResolver(verificationFormSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Select
          label="Content Quality"
          placeholder="Select quality..."
          data={contentQualities}
          {...form.getInputProps("contentQuality")}
        />
        <Select
          label="Category"
          placeholder="Select category..."
          data={categories}
          {...form.getInputProps("category")}
        />
        <Select
          label="Access Type"
          placeholder="Select access type"
          data={[
            { value: "Free", label: "Free" },
            { value: "Paid", label: "Paid" },
          ]}
          {...form.getInputProps("accessType")}
        />
        <Checkbox
          label="Registration Required"
          {...form.getInputProps("registrationRequired", { type: "checkbox" })}
        />
        <Textarea
          label="Description and Notes"
          placeholder="Add description and notes"
          {...form.getInputProps("descriptionAndNotes")}
        />
        <TextInput
          label="Discord Link"
          placeholder="Enter Discord link"
          {...form.getInputProps("socialLinks.discordLink")}
        />
        <TextInput
          label="Telegram Link"
          placeholder="Enter Telegram link"
          {...form.getInputProps("socialLinks.telegramLink")}
        />
        <TextInput
          label="Other Social Link"
          placeholder="Enter other social link"
          {...form.getInputProps("socialLinks.otherSocialLink")}
        />
        <Textarea
          label="Verification Notes"
          placeholder="Add any additional notes or concerns"
          {...form.getInputProps("verificationNotes")}
        />

        <Radio.Group
          label="Approval Decision"
          {...form.getInputProps("approvalDecision")}
        >
          <Group>
            <Radio value="Approve" label="Approve" />
            <Radio value="Reject" label="Reject" />
            <Radio value="Needs Verification" label="Needs Verification" />
          </Group>
        </Radio.Group>
        <Button type="submit">Save Verification</Button>
      </Stack>
    </form>
  );
}

export default VerificationForm;
