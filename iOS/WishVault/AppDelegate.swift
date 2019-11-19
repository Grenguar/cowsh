//
//  AppDelegate.swift
//  WishVault
//
//  Created by Richard Topchii on 16.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import UIKit
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var ref: DatabaseReference!
    
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        ref = Database.database().reference()
        
        ref.child("app").child("kid").child("wishes").observeSingleEvent(of: .value) { (snap) in
            if let array = snap.children.allObjects as? [DataSnapshot] {
                let e = array.map{($0.value as? [String:Any] ?? [:])}.compactMap {
                    WishModel($0)
                }
                
                NotificationCenter.default.post(name: NSNotification.Name("update"), object: e)
                
            }
        }
        
        
        ref.child("app").child("kid").observe(.value) { (snap) in
            print(snap)
        }
        
        
        NotificationCenter.default.addObserver(self, selector: #selector(createNotification(_:)), name: NSNotification.Name("create"), object: nil)
        
        return true
    }
    
    @objc func createNotification(_ notification: Notification) {
        print(notification)
        var hasBeenUpdated = false
        if let wish = notification.object as? WishModel {
            ref.child("app").child("kid").child("wishes").observe(.value) { (snap) in
                if let array = snap.children.allObjects as? [DataSnapshot] {
                    var oldValues = array.map{$0.value}

                    oldValues.append(["price":NSNumber(value: wish.price),
                                      "wish":wish.wish])
                    if !hasBeenUpdated {
                     self.ref.child("app").child("kid").child("wishes").setValue(oldValues)
                        hasBeenUpdated = true
                    }
                    print(oldValues)
                }
            }
        }
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

