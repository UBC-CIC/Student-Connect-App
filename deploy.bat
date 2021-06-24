@echo off

:: TODO Finish batch script
SET aws-profile=%~1

CALL sam build

CALL sam deploy --profile %aws-profile%