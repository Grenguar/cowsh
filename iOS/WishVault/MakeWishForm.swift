//
//  MakeWishForm.swift
//  WishVault
//
//  Created by Richard Topchii on 17.11.2019.
//  Copyright © 2019 Richard Topchii. All rights reserved.
//

import SwiftUI

struct MakeWishView: View {
    @State var vault: Vault
    @State private var dragAmount = CGSize.zero
    
    var body: some View {
        return Circle()
    }
}

struct MakeWishView_Previews: PreviewProvider {
    static var previews: some View {
        let vault = Vault(cash: "4000", title: "PlayStation 4")
        return VaultView(vault: vault)
    }
}

