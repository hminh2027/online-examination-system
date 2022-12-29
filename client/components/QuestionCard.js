import React from "react";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Box, Divider, HStack, Stack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { useForm, useFieldArray } from "react-hook-form";
import { postAPI } from "../apis/axios.js";

const QuestionCard = ({ examId }) => {
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      question: {
        number: 0,
        description: "",
        examId,
        correctAnswer: 0,
        answers: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "question.answers",
  });

  const submitHandler = async (data) => {
    console.log(data);
    const question = { ...data.question, answers: data.answers, examId };
    console.log(question);
    const rs = await postAPI("question/create", question);
    // console.log(rs);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card>
        <CardBody>
          <Stack mt="6" spacing="3">
            <FormControl id="number" isRequired>
              <FormLabel>Câu hỏi thứ:</FormLabel>
              <Input {...register(`question.number`)} name="text" />
            </FormControl>
          </Stack>
          <Stack mt="6" spacing="3">
            <FormControl id="number" isRequired>
              <FormLabel>Câu hỏi:</FormLabel>
              <Textarea {...register(`question.description`)} name="text" />
            </FormControl>
          </Stack>
          <HStack mt="6" spacing="3">
            <FormLabel>Thêm/bớt đáp án:</FormLabel>
            <Button onClick={append}>+</Button>
            <Button onClick={remove}>-</Button>
          </HStack>
          <HStack className="flex flex-wrap justify-around">
            {fields.map((field, index) => (
              <Box key={index}>
                <FormControl id="duration" isRequired>
                  <FormLabel>Đáp án {index + 1}:</FormLabel>
                  <HStack>
                    <Input
                      type="text"
                      key={field.id}
                      {...register(`answers.${index}.description`)}
                    />
                    <input
                      onClick={setValue("question.correctAnswer", index)}
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
