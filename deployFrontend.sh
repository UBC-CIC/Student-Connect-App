#!/bin/bash
export GetESDocumentsLambdaArn=$(aws ssm get-parameter --name ${PREFIX}GetESDocumentsLambdaArn --query Parameter.Value --output text)
export DocumentsTableArn=$(aws ssm get-parameter --name ${PREFIX}documentsTableArn --query Parameter.Value --output text)
python makePolicy.py $GetESDocumentsLambdaArn $DocumentsTableArn
