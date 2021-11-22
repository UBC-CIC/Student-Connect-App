#!/bin/bash
PROJECT_NAME=$(cat ./amplify/.config/project-config.json | jq -r '.projectName')
ENV_NAME=$(cat ./amplify/.config/local-env-info.json | jq -r '.envName')
export PREFIX=/amplify/${PROJECT_NAME}/${ENV_NAME}/

export AthleticsNewsTableArn=$(aws ssm get-parameter --name ${PREFIX}AthleticsNewsTableArn --query Parameter.Value --output text)
export BlogsTableArn=$(aws ssm get-parameter --name ${PREFIX}BlogsTableArn --query Parameter.Value --output text)
export ClubsTableArn=$(aws ssm get-parameter --name ${PREFIX}ClubsTableArn --query Parameter.Value --output text)
export EventsTableArn=$(aws ssm get-parameter --name ${PREFIX}EventsTableArn --query Parameter.Value --output text)
export GetESDocumentsLambdaArn=$(aws ssm get-parameter --name ${PREFIX}GetESDocumentsLambdaArn --query Parameter.Value --output text)
export NewsTableArn=$(aws ssm get-parameter --name ${PREFIX}NewsTableArn --query Parameter.Value --output text)
python makePolicy.py $AthleticsNewsTableArn $BlogsTableArn $ClubsTableArn $EventsTableArn $GetESDocumentsLambdaArn $NewsTableArn
