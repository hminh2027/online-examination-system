import React from "react";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Box, Divider, HStack, Stack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { useForm, useFieldArray } from "react-hook-form";
import { postAPI } from "../apis/axios.js";
import { useToast } from "@chakra-ui/react";

const QuestionCard = ({ examId }) => {
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      question: {
        number: 0,
        description: "",
        examId,
        correctAnswer: 0,
        answers: [
          { number: 1, description: "" },
          { number: 2, description: "" },
        ],
      },
    },
  });

  const toast = useToast();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "question.answers",
  });

  const removeHandler = (e) => {
    if (fields.length < 3) return;
    remove(e);
  };

  const submitHandler = async (data) => {
    const question = { ...data.question, answers: data.answers, examId };
    try {
      await postAPI("question/create", question);
      toast({
        title: `Tạo câu hỏi thành công!`,
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: ` Thất bại!`,
        status: "error",
        isClosable: true,
      });
    }
  };

  const appendHandler = (e) => {
    append(e);
    setValue(`question.answers.${fields.length}.number`, 0);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardBody>
          <Stack mt="6" spacing="3">
            <FormControl isRequired>
              <FormLabel>Câu hỏi thứ:</FormLabel>
              <Input {...register(`question.number`)} type="text" />
            </FormControl>
          </Stack>
          <Stack mt="6" spacing="3">
            <FormControl isRequired>
              <FormLabel>Câu hỏi:</FormLabel>
              <Textarea {...register(`question.description`)} type="text" />
            </FormControl>
          </Stack>
          <HStack mt="6" spacing="3">
            <FormLabel>Thêm/bớt đáp án:</FormLabel>
            <Button onClick={(e) => appendHandler(e)}>+</Button>
            <Button onClick={(e) => removeHandler(e)}>-</Button>
          </HStack>
          <HStack className="flex flex-wrap justify-around">
            {fields.map((field, index) => (
              <Box key={index}>
                <FormControl id="duration" isRequired>
                  <FormLabel>Đáp án {index + 1}:</FormLabel>
                  <HStack>
                    <Input
                      {...register(`answers.${index}.number`)}
                      value={index + 1}
                      className="hidden"
                    />
                    <Input
                      type="text"
                      key={field.id}
                      {...register(`answers.${index}.description`)}
                    />
                    <input
                      onClick={() =>
                        setValue("question.correctAnswer", index + 1)
                      }
                      type="radio"
                      name="isCorrect"
                    />
                  </HStack>
                </FormControl>
              </Box>
            ))}
          </HStack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            w={"100%"}
            loadingText="Submitting"
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            type="submmit"
          >
            Tạo
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default QuestionCard;
