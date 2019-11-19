//
//  Home.swift
//  WishVault
//
//  Created by Richard Topchii on 17.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import SwiftUI

let window = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
let statusBarHeight = window?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
let screen = UIScreen.main.bounds

struct Home: View {

   @State var show = false
   @State var showProfile = false

   var body: some View {
      ZStack(alignment: .top) {
         HomeList()
            .blur(radius: show ? 20 : 0)
            .scaleEffect(showProfile ? 0.95 : 1)
            .animation(.default)

         ContentView()
            .frame(minWidth: 0, maxWidth: 712)
            .cornerRadius(30)
            .shadow(radius: 20)
            .animation(.spring())
            .offset(y: showProfile ? statusBarHeight + 40 : UIScreen.main.bounds.height)
         .offset(y: showProfile ? statusBarHeight : 80)
         .animation(.spring())
      }
      .background(Color("background"))
      .edgesIgnoringSafeArea(.all)
   }
}

#if DEBUG
struct Home_Previews: PreviewProvider {
   static var previews: some View {
      Home()
         .previewDevice("iPhone X")
   }
}
#endif
