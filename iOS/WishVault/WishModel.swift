//
//  WishModel.swift
//  WishVault
//
//  Created by Richard Topchii on 17.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import Foundation
import SwiftUI

struct WishModel: Identifiable {
    var id = UUID()
    let price: Int
    let wish: String
    var color: Color!
    var shadowColor: Color!
    
    var formattedPrice: String {
        let f = NumberFormatter()
        f.numberStyle = .currency
        f.generatesDecimalNumbers = false
        f.currencyCode = "EUR"
        return f.string(from: NSNumber(value: price))!
    }
    
    init(price: Int, wish: String) {
        let c = WishModel.coursesData.randomElement()!
        self.price = price
        self.wish = wish
        self.color = c.color
        self.shadowColor = c.shadowColor
    }
    
    init(_ dict: [String:Any]) {
        self.price = dict["price"] as! Int
        self.wish = dict["wish"] as! String
        let c = WishModel.coursesData.randomElement()!
        self.color = c.color
        self.shadowColor = c.shadowColor
    }
    

    private static let coursesData = [
       Course(title: "",
              image: "Illustration1",
              color: Color("background3"),
              shadowColor: Color("backgroundShadow3")),
       Course(title: "",
              image: "Illustration2",
              color: Color("background4"),
              shadowColor: Color("backgroundShadow4")),
       Course(title: "",
              image: "Illustration3",
              color: Color("background7"),
              shadowColor: Color(hue: 0.677, saturation: 0.701, brightness: 0.788, opacity: 0.5)),
       Course(title: "",
              image: "Illustration4",
              color: Color("background8"),
              shadowColor: Color(hue: 0.677, saturation: 0.701, brightness: 0.788, opacity: 0.5)),
       Course(title: "",
              image: "Illustration5",
              color: Color("background9"),
              shadowColor: Color(hue: 0.677, saturation: 0.701, brightness: 0.788, opacity: 0.5)),
    ]

}
