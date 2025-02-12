#include<stdio.h>
        int main(){
            int n1 , sum=0;
            scanf("%d",&n1);
            int arr[n1];
            for(int i=0;i<n1;i++){
                scanf("%d",&arr[i]);
                sum+=arr[i];
            }
            printf("%d",sum);
            return 0; 
        }