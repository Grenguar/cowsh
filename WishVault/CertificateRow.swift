//
//  CertificateRow.swift
//  WishVault
//
//  Created by Richard Topchii on 17.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import SwiftUI
import Firebase
import Foundation

struct Task: Identifiable {
    var id = UUID()
    let completed: Bool
    let description: String
    let price: String
    
    var formattedPrice: String {
        let f = NumberFormatter()
        f.numberStyle = .currency
        f.generatesDecimalNumbers = false
        f.currencyCode = "EUR"
        return f.string(from: NSNumber(value: Int(price) ?? 0))!
    }
    
    init(completed: Bool, description: String, price: String) {
        self.completed = completed
        self.description = description
        self.price = price
    }
    
    init(_ dict: [String:Any]) {
        self.completed = dict["completed"] as! Bool
        self.description = dict["description"] as! String
        self.price = dict["price"] as! String
        
    }
}

struct CertificateRow: View {
private var ref: DatabaseReference = Database.database().reference()
   var certificates = certificateData
    @State var count: Int = 0
    @State var courses = [Task]()

   var body: some View {
    
    self.ref.child("app").child("kid").child("tasks").observe(.value) { (snap) in
        if let array = snap.children.allObjects as? [DataSnapshot] {
            if array.count == self.count {
                return
            }
            let e = array.map{($0.value as? [String:Any] ?? [:])}.compactMap { (dict) -> Task? in
                return Task(dict)
            }
            self.courses = e
            self.count = array.count
        }
    }

      return VStack(alignment: .leading) {
         Text("Tasks")
            .font(.largeTitle)
            .fontWeight(.heavy)
            .foregroundColor(Color(#colorLiteral(red: 0.01003782917, green: 0.8271033168, blue: 0.8121228814, alpha: 1)))

         ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 20) {
               ForEach(courses) { item in
                  CertificateView(item: item)
               }
            }
            .padding(20)
            .padding(.leading, 10)
         }
      }
   }
}

#if DEBUG
struct CertificateRow_Previews: PreviewProvider {
   static var previews: some View {
      CertificateRow()
   }
}
#endif

struct Certificate: Identifiable {
   var id = UUID()
   var title: String
   var image: String
   var width: Int
   var height: Int
}

let certificateData = [
   Certificate(title: "UI Design", image: "Certificate1", width: 230, height: 150),
   Certificate(title: "SwiftUI", image: "Certificate2", width: 230, height: 150),
   Certificate(title: "Sketch", image: "Certificate3", width: 230, height: 150),
   Certificate(title: "Framer", image: "Certificate4", width: 230, height: 150)
]
