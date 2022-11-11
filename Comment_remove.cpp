#include <bits/stdc++.h>
#include<fstream>
using namespace std;

int main(int argc,char** args ) {
    ifstream fin;
    ofstream fout;
    fin.open(args[1]);
    fout.open(args[2]);
    char ch;
    while(!fin.eof()){
        fin.get(ch);
        if(ch=='/'){
            fin.get(ch);
            if(ch=='/' )
            {   //cout<<"Detected\n";
                fin.get(ch);
                while(!(ch=='\n'||ch=='\0'))
                {
                //cout<<"while";
                fin.get(ch);
                }
            }
            if(ch=='*')
            {
                fin.get(ch);
                while(!(ch=='*')){
                    fin.get(ch);
                }
                fin.get(ch);
                if(ch=='/'){
                //  cout<<"Detected Multi-Line\n";
                    fin.get(ch);
                }

            }
        }
        fout<<ch;
    }
    return 0;
}
