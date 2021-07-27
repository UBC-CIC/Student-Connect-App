#!/bin/bash
export AthleticsNewsTableArn=$(aws ssm get-parameter --name AthleticsNewsTableArn --query Parameter.Value --output text)
export BlogsTableArn=$(aws ssm get-parameter --name BlogsTableArn --query Parameter.Value --output text)
export ClubsTableArn=$(aws ssm get-parameter --name ClubsTableArn --query Parameter.Value --output text)
export EventsTableArn=$(aws ssm get-parameter --name EventsTableArn --query Parameter.Value --output text)
export GetESDocumentsLambdaArn=$(aws ssm get-parameter --name GetESDocumentsLambdaArn --query Parameter.Value --output text)
export NewsTableArn=$(aws ssm get-parameter --name NewsTableArn --query Parameter.Value --output text)
python makePolicy.py $AthleticsNewsTableArn $BlogsTableArn $ClubsTableArn $EventsTableArn $GetESDocumentsLambdaArn $NewsTableArn
