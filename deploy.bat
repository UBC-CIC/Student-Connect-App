:: deploy.bat aws-profile:<AWS_PROFILE> aws-region:<AWS_REGION>  stack-name:<STACK_NAME>
@echo off

SET tempvar1=%~1
SET tempvar2=%~2
SET tempvar3=%~3

SET aws-profile=%tempvar1:~12,250%
SET aws-region=%tempvar2:~11,250%
SET stack-name=%tempvar3:~11,250%

cd functions

xcopy /y common_lib.py es_hasher
xcopy /y common_lib.py get_athletics_news_data
xcopy /y common_lib.py get_blog_data
xcopy /y common_lib.py get_club_data
xcopy /y common_lib.py get_es_documents
xcopy /y common_lib.py get_events_data
xcopy /y common_lib.py get_news_data

cd ..

CALL sam build

CALL sam deploy --profile %aws-profile% --region %aws-region% --stack-name %stack-name% --guided