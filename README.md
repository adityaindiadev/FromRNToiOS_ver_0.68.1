// ------- createRootViewController is function that exist in "react-native": "0.71.8", 

instead of it you can directly write :-
```sh
UIViewController *rootViewController = [UIViewController new];
```

// ------- createRootViewController Starts 
```sh
- (UIViewController *)createRootViewController
{
  return [UIViewController new];
}
```
 //createRootViewController Ends ------- 



//------------- Main OLD Default Code Starts
```sh
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [self createRootViewController];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
  ```
// Main Old Default Code Ends -------------


//------------- Code Written By Aditya Gupta 28 Aug 2023

// ------- Main Code Starts Here  

```sh 
self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    
UIViewController *rootViewController = [UIViewController new];    
```
// ---- Or You can call createRootViewController function that is created above ("react-native": "0.71.8")
```sh 
    UIViewController *rootViewController = [self createRootViewController]; 
```

------- Main Code Continue...
```sh
rootViewController.view = rootView;
UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:rootViewController];
self.window.rootViewController = navigationController;
[self.window makeKeyAndVisible];
```

Main Code Ends Here -------

//Code Written By Aditya Gupta 28 Aug 2023 -------------