//
//  HomeList.swift
//  WishVault
//
//  Created by Richard Topchii on 17.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import SwiftUI
import Firebase

struct HomeList: View {
    private var ref: DatabaseReference = Database.database().reference()
    
    private var colorsData = coursesData
    
    @State var courses = [WishModel]()
    @State var showContent = false
    @State var modalDisplayed = false
    @State var count = 0
    @State var balance = 0
    
    var body: some View {
        
        
        self.ref.child("app").child("kid").child("wishes").observe(.value) { (snap) in
            if let array = snap.children.allObjects as? [DataSnapshot] {
                if array.count == self.count {
                    return
                }
                let e = array.map{($0.value as? [String:Any] ?? [:])}.compactMap { (dict) -> WishModel? in
                    return WishModel(dict)
                }
                self.courses = e
                self.count = array.count
            }
        }
        
        self.ref.child("app").child("kid").child("balance").observe(.value) { (snap) in
            if let value = snap.value as? DataSnapshot {
                if let b = value as? Int {
                    print("Balance \(b)")
                    if b != self.balance {
                        self.balance = b
                    }
                }
            }
                
        }
        
        return ScrollView {
            VStack {
                HStack {
                    VStack(alignment: .leading) {
                        Text("WishVault Balance: €\(self.balance)")
                            .font(.largeTitle)
                            .fontWeight(.heavy)
                            .foregroundColor(Color(#colorLiteral(red: 0.01003782917, green: 0.8271033168, blue: 0.8121228814, alpha: 1)))
                    }
                    Spacer()
                    Spacer()
                    Spacer()
                    ModalPresenter {
                        ModalLink(destination: CreateFlow()) {
                            Text("+ Add")
                                .font(.largeTitle)
                                .fontWeight(.heavy)
                                .foregroundColor(Color(#colorLiteral(red: 0.01003782917, green: 0.8271033168, blue: 0.8121228814, alpha: 1)))
                        }
                    }
                    Spacer(minLength: 5)
                }
                .padding(.leading, 60.0)
                
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 30.0) {
                        ForEach(courses) { item in
                            Button(action: { self.showContent.toggle() }) {
                                GeometryReader { geometry in
                                    
                                    WishView(title: item.wish,
                                               price: item.formattedPrice,
                                               image: "",
                                               color: item.color,
                                               shadowColor: item.shadowColor)
                                        .rotation3DEffect(Angle(degrees:
                                            Double(geometry.frame(in: .global).minX - 30) / -40), axis: (x: 0, y: 10.0, z: 0))
                                        .sheet(isPresented: self.$showContent) { ContentView() }
                                }
                                .frame(width: 246, height: 360)
                            }
                        }
                    }
                    .padding(.leading, 30)
                    .padding(.top, 30)
                    .padding(.bottom, 70)
                    Spacer()
                }
                CertificateRow()
            }
            .padding(.top, 78)
        }
    }
}

#if DEBUG
struct HomeList_Previews: PreviewProvider {
   static var previews: some View {
      HomeList()
   }
}
#endif

struct WishView: View {

   var title = ""
    var price = ""
   var image = "Illustration1"
   var color = Color("background3")
   var shadowColor = Color("backgroundShadow3")

   var body: some View {
      return VStack(alignment: .leading) {
         Text(title)
            .font(.title)
            .fontWeight(.bold)
            .foregroundColor(.white)
            .padding(30)
            .lineLimit(4)

         Spacer()
        
        Text(price)
           .font(.title)
           .fontWeight(.bold)
           .foregroundColor(.white)
           .padding(30)
           .lineLimit(4)
        
        Rectangle().frame(width: 300, height: 1, alignment: .center)

        }
      .background(color)
      .cornerRadius(30)
      .frame(width: 246, height: 360)
      .shadow(color: shadowColor, radius: 20, x: 0, y: 20)
   }
}

struct Course: Identifiable {
   var id = UUID()
   var title: String
   var image: String
   var color: Color
   var shadowColor: Color
}

let coursesData = [
   Course(title: "test",
          image: "Illustration1",
          color: Color("background3"),
          shadowColor: Color("backgroundShadow3")),
   Course(title: "test",
          image: "Illustration2",
          color: Color("background4"),
          shadowColor: Color("backgroundShadow4")),
   Course(title: "test",
          image: "Illustration3",
          color: Color("background7"),
          shadowColor: Color(hue: 0.677, saturation: 0.701, brightness: 0.788, opacity: 0.5)),
   Course(title: "test",
          image: "Illustration4",
          color: Color("background8"),
          shadowColor: Color(hue: 0.677, saturation: 0.701, brightness: 0.788, opacity: 0.5)),
   Course(title: "test",
          image: "Illustration5",
          color: Color("background9"),
          shadowColor: Color(hue: 0.677, saturation: 0.701, brightness: 0.788, opacity: 0.5)),
]
