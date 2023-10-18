//
//  GetCookies.swift
//  FromRNToiOS
//
//  Created by Aditya Gupta on 17/10/23.
//

import Foundation
import Alamofire
import React

@objc(GetCookies)

class GetCookies: NSObject
//                    RCTBridgeModule
{
  
  //  static func moduleName() -> String {
  //    return "MyNativeModule"
  //  }
  
  
  //  static func moduleName() -> String {
  //    return "MyNativeModule"
  //  }
  
//  @objc func makePostRequest(_ url: String,
//                             postData: [String: Any],
//                             resolver: @escaping RCTPromiseResolveBlock,
//                             rejecter: @escaping RCTPromiseRejectBlock) {
//    // Use Alamofire to make the POST request
//    AF.request(url, method: .post, parameters: postData, encoding: URLEncoding.httpBody)
//      .responseJSON { response in
//        switch response.result {
//        case .success(let value):
//          // Resolve the promise with the response data
//          resolver(value)
//        case .failure(let error):
//          // Reject the promise with the error
//          rejecter("POST_REQUEST_FAILED", "Failed to make POST request", error)
//        }
//      }
//  }
  
  func getAlomofireManager() -> Session {
    let manager = Session.default
    manager.session.configuration.timeoutIntervalForRequest = 60
    return manager
   }
  
  typealias Response = (Any?, NSError?, String?) -> Void
  
  @objc func createLoginSession() {
  
    let url = "https://adsso.airtel.com/adfs/ls?wa=wsignin1.0&wtrealm=urn%3ahive%3aairtel&wctx=https%3a%2f%2fhive.airtel.com&RedirectToIdentityProvider=AD+AUTHORITY"
    let headers : HTTPHeaders = [
        "Content-Type" : "application/x-www-form-urlencoded"
    ]
    let tempStr = "oneairtel\\B0272833"
    let params: [String: Any] = [
      "UserName": tempStr,
      "Password": "0~Ogsewx"
    ]
    
      let manager = getAlomofireManager()
      var originalRequest: URLRequest?
      do {
        originalRequest = try URLRequest(url: url, method: .post, headers: headers)
        originalRequest?.timeoutInterval = 60
        let encodedURLRequest = try URLEncoding.httpBody.encode(originalRequest!, with: params)
        manager.request(encodedURLRequest).responseJSON { (responseObject) -> Void in
          print(responseObject)
          if let cookies = manager.session.configuration.httpCookieStorage?.cookies {
            print(cookies)
            if cookies.count > 0 {
//              completionHandler(cookies,nil,nil)
              return
            }
          }
          //let error: NSError = NSError(domain: "Invalid Parameters", code: 0, userInfo: ["NSLocalizedDescription":ERROR_GENERIC_MESSAGE])
//          completionHandler(nil,error,nil)
          return
        }
      } catch {
        //let error: NSError = NSError(domain: "Invalid Parameters", code: 0, userInfo: ["NSLocalizedDescription":ERROR_GENERIC_MESSAGE])
//        completionHandler(nil,error,nil)
      }
    }
  
  
  
  @objc func makePostRequest() {
    // Define the URL for your API endpoint
    guard let url = URL(string: "https://adsso.airtel.com/adfs/ls?wa=wsignin1.0&wtrealm=urn%3ahive%3aairtel&wctx=https%3a%2f%2fhive.airtel.com&RedirectToIdentityProvider=AD+AUTHORITY") else {
      print("Invalid URL")
      return
    }
    // Create a URLRequest
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    // Set the HTTP headers
    request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
    // Define the request body (if needed)
    
    let tempStr = "oneairtel\\B0272833"
    let parameters: [String: Any] = [
      "UserName": tempStr,
      "Password": "0~Ogsewx"
    ]
    
    do {
      //request.httpBody = try JSONSerialization.data(withJSONObject: parameters)
      let encodedURLRequest = try URLEncoding.httpBody.encode(request, with: parameters)
    } catch {
      print("Error encoding parameters: \(error)")
      return
    }
    // Create a URLSession task for the request
    let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
      
      if let error = error {
        print("Request error: \(error)")
        return
      }
      if let data = data {
        do {
          let cookies = URLSession.shared.configuration.httpCookieStorage?.cookies
          print(cookies)
        } catch {
          print("Error parsing response: \(error)")
        }
      }
    }
    // Start the task
    task.resume()
  }
  
  
  
  
}


