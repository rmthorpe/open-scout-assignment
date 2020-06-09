import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Box, Heading, Text, Divider, Button, Popover, PopoverTrigger, PopoverContent, Icon, Badge, PopoverArrow} from '@chakra-ui/core';
import { Header } from './Header';
import { getAllPublicOnePagerData } from '../data/dataService';
import { OnePagerPublicData } from '../model/model';

/** Renders the home component. */
export const Home = () => {
  const [onePagers, setOnePagers]: [OnePagerPublicData[], any] = React.useState(
    []
  );

  // React hook to load data on first render
  React.useEffect(() => {
    getAllPublicOnePagerData().then((result) => {
      setOnePagers(result);
    });
  }, []);

  return (
    <Box>
      <Head>
        <title>One Pager Alpha</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />

      <Box d='flex' justifyContent='center'>
        <Box w='xl' justifyContent='center'>
          <Heading as='h1' size='xl' textAlign="center">
            Hello Ryan, Welcome to One Pager Alpha!
          </Heading>

          <Heading as='h2' size='md' textAlign="center">
            View active OnePagers
          </Heading>
 
          <Heading as='h2' size='md' textAlign="center">
            Hover over button to see more. Click to see company page.
          </Heading>

          <Divider/>
          <Text>{'\n'}</Text>
          
          <OnePagerLinks onePagers={onePagers} />
        </Box>
      </Box>
    </Box>
  );
};

type OnePagerLinksProps = {
  onePagers: OnePagerPublicData[];
};

const OnePagerLinks = ({ onePagers }: OnePagerLinksProps) => {
  return (
    <>
      {onePagers.map((onePagerData: OnePagerPublicData) => (
        <Box key={onePagerData.companyName} marginBottom='10px' justifyContent="center">
          
{/* Reformat all company names as buttons. Hover over button to reveal industry tags and description. */}
            <Popover trigger="hover">
                  <PopoverTrigger>
                    <Box style={{display: 'flex', justifyContent: "center"}}>
                      <Link href='/[onePagerSlug]' as={`/${onePagerData.url}`}>
                        <a><Button variantColor ="blue" color = "white" mt = {5}>{onePagerData.companyName}</Button></a>
                      </Link>
                    </Box>
                  </PopoverTrigger>
                    
  
                  <PopoverContent gutter={0} placement="right" background='linear-gradient(to left, #b6fbff, #83a4d4)'>
                    {(() => {
                      const tags = [];
                      for(var d in onePagerData.industryTags){
                        tags.push(<Badge rounded='full' 
                        marginLeft= {5}
                        textAlign = 'center'
                        marginRight= {5}
                        marginTop = {1}
                        marginBottom = {1}
                        bg='blue'>{onePagerData.industryTags[d]}</Badge>);
                      }
                      return tags;
                    })()}
                    <Box justifyContent="center">
                      <Text mt={4} 
                        pl = {2} 
                        marginLeft = {8}
                        marginRight = {8}
                        textAlign={'center'}>
                        {onePagerData.briefDescription}
                      </Text>
                    </Box>
                  </PopoverContent>
            </Popover>
          

          <Text margin='0'></Text>
        </Box>
      ))}
    </>
  );
};
