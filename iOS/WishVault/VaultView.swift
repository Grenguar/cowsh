//
//  VaultView.swift
//  WishVault
//
//  Created by Richard Topchii on 16.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import SwiftUI

struct Vault {
    let cash: String
    let title: String
}

struct VaultView: View {
    @State var vault: Vault
    @State private var dragAmount = CGSize.zero
    
    var body: some View {
        VStack {
            Image("Vault")
            VStack(alignment: .center, spacing: 20){
                Text(vault.title)
                    .font(Font.system(size: 48))
                    .foregroundColor(.white)
                    .fontWeight(.bold)
                Text(vault.cash)
                    .font(.largeTitle)
                    .foregroundColor(.white)
                    .fontWeight(.bold)
            }
        }
    .lineSpacing(10)
        .padding(100)
        .background(
            RoundedRectangle(cornerRadius: 30)
                .fill(
                    LinearGradient(gradient:
                        Gradient(colors: [Color(#colorLiteral(red: 0.01003782917, green: 0.8271033168, blue: 0.8121228814, alpha: 1)), Color(#colorLiteral(red: 0.03921568627, green: 0.7294117647, blue: 0.7098039216, alpha: 1))]),
                                   startPoint: .top,
                                   endPoint: .bottom)
            )
        )
            
//            .frame(width: 500, height: 200, alignment: .center)
            .shadow(color: .black, radius: 5, x: 0, y: 4).onTapGesture {
                
        }
    }
}

struct VaultView_Previews: PreviewProvider {
    static var previews: some View {
        let vault = Vault(cash: "4000", title: "PlayStation 4")
        return VaultView(vault: vault)
    }
}

