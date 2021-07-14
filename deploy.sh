#!/usr/bin/env bash
# ./deploy.sh --aws-profile <AWS_PROFILE> --aws-region <AWS_REGION> --stack-name <STACK_NAME>

awsProfile=${2}
awsRegion=${4}
stackName=${6}

cd functions

\cp common_lib.py es_hasher
\cp common_lib.py get_athletics_news_data
\cp common_lib.py get_blog_data
\cp common_lib.py get_club_data
\cp common_lib.py get_es_documents
\cp common_lib.py get_events_data
\cp common_lib.py get_news_data

cd ..

sam build

sam deploy --profile ${awsProfile} --region ${awsRegion} --stack-name ${stackName} --guided