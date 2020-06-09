import React from 'react';
import { Box, Flex, Heading, Text, Avatar } from '@chakra-ui/core';

import { OnePagerData, OnePagerPerson } from '../model/model';
import { ContentCard } from './ContentCard';

type OnePagerInvestorsProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

/** Renders the Founders card. */
export const OnePagerInvestors = ({
  onePagerData,
  isLoading,
}: OnePagerInvestorsProps) => {
  return (
    <ContentCard title='Investors' isLoading={isLoading}>
      {
        (() => {
          const investors = [];
          for (var i in onePagerData.investors){
            var currentInv = onePagerData.investors[i]
            investors.push(
            <Flex align='center'>
              <Avatar marginRight='10px'></Avatar>

            <Box>
              <Box d='inline-flex' alignItems='baseline'>
                <Heading as='h2' size='md' marginBottom='0' marginRight ='10px'>{currentInv.name}</Heading> 
                <Heading as='h2' size='sm' marginBottom='0' marginRight ='10px'>{currentInv.title}</Heading> 
              </Box>
              <Text marginTop='0'>{currentInv.description}</Text>
            </Box>

            </Flex>
            )
          }
          return investors;
        })()}
    </ContentCard>
  );
};
