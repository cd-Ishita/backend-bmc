//#include<bits/stdc++.h>
#include<fstream>
#include<iostream>
#include<cstring>
#include<string>

using namespace std;


int main(int argc,char* args[])
{
    ifstream fin;
    ofstream fout;
    string SourceFile=strcat(args[1],"");
    string DestinationFile=strcat(args[2],"");
    string StartingString="Warning: BMC: Assertion violation happens here.";
    string ClosingString="Note: Callstack:";
    fin.open(SourceFile);
    fout.open(DestinationFile);
    string outputPerLine;
    while(getline(fin,outputPerLine))
    {
       if(outputPerLine==StartingString)
       {
           while(outputPerLine!=ClosingString)
           {
               fout<<outputPerLine<<endl;
               getline(fin,outputPerLine);
           }
       }
    }
    return 0 ;
}
