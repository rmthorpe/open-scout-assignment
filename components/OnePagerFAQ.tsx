import React from 'react';
import { Heading, Button } from '@chakra-ui/core';
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/core";
import { useForm } from "react-hook-form"
import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';
import { Box, Input, FormLabel, FormControl } from "@chakra-ui/core";

type OnePagerFAQProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

/** Renders the FAQ card. */
export const OnePagerFAQ= ({
  onePagerData,
  isLoading,
}: OnePagerFAQProps) => {
  const {handleSubmit, errors, register, formState} = useForm();

  function onSubmit(values) {
   var recent_faq = values["faq"]
    onePagerData.recent_faq.push(recent_faq)
}

  function validateQuestion(value) {
    let error;
    if (!value) {
      error = "Please type a question"
    }
    return error || true;
  }

  var percent = (onePagerData.fundsRaisedInStage/onePagerData.fundraisingStageGoal) * 100;
  return (
    // Display Fundraising Information, including Funding Stage, Formatted Funds Raised and Goal, Fundraising Goal Percent Met, 
    // and Fundraising Details 
    <ContentCard title='Frequently Asked Questions' isLoading={isLoading}>
    {
    (()=> {
      var faqs = [];
      for (var d in onePagerData.recent_faq){
      faqs.push(<Heading as='h4' size='sm'>{onePagerData.recent_faq[d]}</Heading>)
      }
      return faqs;
    })()}
    <Box marginRight = {10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box d='inline-flex' alignItems='baseline'>
          <Input name="faq" placeholder="Ask your own question" ref={register({ validate: validateQuestion})} size="sm"/>
          <Button variantColor="blue" ml = {5} size = "sm" isLoading={formState.isSubmitting} type="submit">Submit</Button>
        </Box>
      </form>
    </Box>

    </ContentCard>
  );
};
