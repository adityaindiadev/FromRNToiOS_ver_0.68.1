//
//  GetCookies.m
//  FromRNToiOS
//
//  Created by Aditya Gupta on 17/10/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTEventEmitter.h"
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(GetCookies,NSObject);

//  RCT_EXTERN_METHOD(myMethod:(int)value ) //Here exported your swift function for React Native

RCT_EXTERN_METHOD(makePostRequest);
RCT_EXTERN_METHOD(createLoginSession);//Here exported your swift function for React Native


@end

