@echo off

:: TODO Finish batch script
SET bucket-name=%~1
SET aws-region=%~2
SET aws-profile=%~3
SET stack-name=%~4

CALL sam build

CALL sam deploy