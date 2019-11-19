//
//  CreateFlow.swift
//  WishVault
//
//  Created by Richard Topchii on 17.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import SwiftUI
import Firebase

struct CreateFlow: View {
     @State private var name: String = ""
     @State private var price: String = "0"
    
    @State var ref: DatabaseReference!
    
    var body: some View {
        return VStack {
            Form {
                Text("Create a wish")
                    .bold()
                    .font(.title)
                
                Section(header:
                Text("Name")
                .font(.headline)
                ) {
                    
                    TextField("Gaming Console", text: $name)
                }
                Section(header: Text("Price").font(.headline)) {
                    TextField("Price", text: $price)
                }
                Button(action: {
                    let wish = WishModel(price: Int(self.price) ?? 0, wish: self.name)
                    let notification = Notification(name: Notification.Name(rawValue: "create"), object: wish, userInfo: nil)
                    NotificationCenter.default.post(notification)
                    print("Notification Created")
                    print("Create a wish")
                }) {
                    Text("Create a wish")
                    .font(.title)
                    .fontWeight(.heavy)
                    .foregroundColor(Color(#colorLiteral(red: 0.01003782917, green: 0.8271033168, blue: 0.8121228814, alpha: 1)))
                }
            }
        }
    }
}

struct CreateFlow_Previews: PreviewProvider {
    static var previews: some View {
        return CreateFlow()
    }
}

