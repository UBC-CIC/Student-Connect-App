import sys
import json
print(sys.argv)
#AthleticsNewsTableArn=sys.argv[1]
#BlogsTableArn=sys.argv[2]
#ClubsTableArn=sys.argv[3]
#EventsTableArn=sys.argv[4]
#GetESDocumentsLambdaArn=sys.argv[5]
#NewsTableArn=sys.argv[6]

GetESDocumentsLambdaArn=sys.argv[1]
DocumentsTableArn=sys.argv[2]


#arnList=[AthleticsNewsTableArn,BlogsTableArn,ClubsTableArn,EventsTableArn,GetESDocumentsLambdaArn,NewsTableArn]
arnList=[GetESDocumentsLambdaArn,DocumentsTableArn]

print(sys.argv)
f = open('lambda-dynamodb-policy.json')
data = json.load(f)
data["Statement"][0]["Resource"]=arnList


with open('lambda-dynamodb-policy.json', 'w') as f:
    json.dump(data, f,indent=4)

print(json.dumps(data, indent=4))

f.close()

