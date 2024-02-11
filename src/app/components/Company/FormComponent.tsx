import {
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Image,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import NextImage from "next/image";
import noimage from "../../../../public/images/companylogo-noimage.svg";
import { useState } from "react";

const FormComponent = () => {
  const form = useForm({
    validate: {
      file: (value) => (value ? null : "File is required"),
    },
  });

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("file", values.file);

    try {
      const response = await fetch("/api/company", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const [file, setFile] = useState<File | null>(null);

  return (
    <Box maw="800px">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box mt="lg">
          <Text fw={500} size="sm">
            Logo Image
          </Text>
          <Flex gap="lg" align={"center"}>
            <Image
              radius="md"
              component={NextImage}
              src={noimage}
              width={100}
              height={100}
              // fallbackSrc="https://placehold.co/200x200?text=no image"
              alt="Company Logo"
            />
            {/* <FileInput
              label="Logo Image"
              placeholder="Input placeholder"
              {...form.getInputProps("file")}
            /> */}
            <Box>
              <Group justify="flex-start">
                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                  {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
              </Group>

              {file && (
                <Text size="sm" ta="center" mt="sm">
                  Picked file: {file.name}
                </Text>
              )}
            </Box>
          </Flex>
        </Box>

        <TextInput
          label="Legal/Trading name"
          placeholder="Custom layout"
          mt="lg"
        />
        <TextInput label="UEN" placeholder="Custom layout" mt="lg" />

        <TextInput label="Address" placeholder="Street address" mt="lg" />
        <TextInput placeholder="Town/City" mt="lg" />
        <Flex gap="md" mt="lg">
          <TextInput placeholder="State/Region" w="50%" />
          <TextInput placeholder="Postal code" w="50%" />
        </Flex>

        <TextInput label="Phone" placeholder="Custom layout" mt="lg" />
        <TextInput label="Bank Name" placeholder="Custom layout" mt="lg" />
        <TextInput label="Branch Name" placeholder="Custom layout" mt="lg" />
        <TextInput label="A/C Name" placeholder="Custom layout" mt="lg" />
        <TextInput label="A/C Type" placeholder="Custom layout" mt="lg" />
        <TextInput label="A/C #" placeholder="Custom layout" mt="lg" />
        <TextInput label="Bank Code" placeholder="Custom layout" mt="lg" />
        <TextInput label="Swift BIC Code" placeholder="Custom layout" mt="lg" />
        <TextInput label="Branch #" placeholder="Custom layout" mt="lg" />
        <Textarea
          label="Invoice Remarks"
          placeholder="Custom layout"
          mt="lg"
          resize="vertical"
        />

        <Group justify="center" mt="xl">
          <Button fullWidth type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default FormComponent;
