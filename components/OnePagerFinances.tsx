import React from 'react';
import { Heading } from '@chakra-ui/core';
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/core";

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';

type OnePagerFinancesProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

/** Renders the Finances card. */
export const OnePagerFinances = ({
  onePagerData,
  isLoading,
}: OnePagerFinancesProps) => {

  // Format a number to include a dollar sign, along with commas in appropriate positions. 
  const formatFinanceNumber = (financeNumber: number) => {
    var fin_string = String(financeNumber).split('').reverse();
    var formatted = [];

    var j = 0;
    for (var i = 0; i < fin_string.length; i++){
      if (i % 3 === 0 && i != 0) {
        formatted[i + j] = ','
        j++
      }
      formatted[i + j] = fin_string[i]
    }

    formatted = formatted.reverse()
    var final_string = '$' + formatted.join("")
    
    return final_string;
  };

  var percent = (onePagerData.fundsRaisedInStage/onePagerData.fundraisingStageGoal) * 100;
  return (
    // Display Fundraising Information, including Funding Stage, Formatted Funds Raised and Goal, Fundraising Goal Percent Met, 
    // and Fundraising Details 
    <ContentCard title='Finances' isLoading={isLoading}>
      <Heading as='h1' size='lg' marginRight='10px'>
        Funding Stage: {onePagerData.fundraisingStage}
      </Heading>

      <SubHeading>
        Funds Raised: {formatFinanceNumber(onePagerData.fundsRaisedInStage)}
      </SubHeading>

      <SubHeading>
        Funding Goal: {formatFinanceNumber(onePagerData.fundraisingStageGoal)}
      </SubHeading>

      <SubHeading> 
        Percent of Funds Raised: 
      </SubHeading>

      <CircularProgress value = {percent} size="120px" color = "blue" thickness={0.25} >
        <CircularProgressLabel>{percent.toFixed(1)}%</CircularProgressLabel>
      </CircularProgress>

      <SubHeading>
        Fundraising Details: {onePagerData.fundraisingDetails}
      </SubHeading>

    </ContentCard>
  );
};

/** Renders smaller heading. */
const SubHeading = ({ children }) => (
  <Heading as='h2' size='md' marginRight='10px'>
    {children}
  </Heading>
);
