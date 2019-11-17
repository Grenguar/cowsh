//
//  ContentView.swift
//  WishVault
//
//  Created by Richard Topchii on 16.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import SwiftUI

struct ContentView: View {

   @State var show = false
   @State var viewState = CGSize.zero

   var body: some View {
      ZStack {
         BlurView(style: .systemMaterial)

      }
   }
}

#if DEBUG
struct ContentView_Previews: PreviewProvider {
   static var previews: some View {
      ContentView()
   }
}
#endif

struct CardView: View {
   var body: some View {
      return VStack {
         Text("Card Back")
      }
      .frame(width: 340.0, height: 220.0)
   }
}

struct CertificateView: View {

   var item = Task(completed: true, description: "", price: "")

   var body: some View {
      return VStack {
         HStack {
            VStack(alignment: .leading) {
               Text(item.description)
                  .font(.largeTitle)
                  .fontWeight(.bold)
                  .foregroundColor(Color("accent"))
                  .padding(.top)

                Text(item.formattedPrice)
                  .foregroundColor(.white)
                .font(.headline)
                .fontWeight(.bold)
//            }
            Spacer()

         }
         .padding(.horizontal)
         Spacer()
      }
      .frame(width: CGFloat(200), height: CGFloat(200))
      .background(Color.black)
//      .cornerRadius(10)
//      .shadow(radius: 10)
   }
}

struct TitleView: View {
   var body: some View {
      return VStack {
         HStack {
            Text("Tasks")
               .font(.largeTitle)
               .fontWeight(.heavy)

            Spacer()
         }
         Image("Illustration5")

         Spacer()
      }.padding()
   }
}

struct CardBottomView: View {
   var body: some View {
      return VStack(spacing: 20.0) {
         Rectangle()
            .frame(width: 60, height: 6)
            .cornerRadius(3.0)
            .opacity(0.1)

         Text("This certificate is proof that Mithun has achieved UI Design course with approval from a Design+Code instructor.")
            .lineLimit(nil)

         Spacer()
      }
      .frame(minWidth: 0, maxWidth: .infinity)
      .padding()
      .padding(.horizontal)
      .background(BlurView(style: .systemMaterial))
      .cornerRadius(30)
      .shadow(radius: 20)
      .offset(y: UIScreen.main.bounds.height - 215)
   }
}
}
