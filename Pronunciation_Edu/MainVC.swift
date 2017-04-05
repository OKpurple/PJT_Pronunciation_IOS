//
//  ViewController.swift
//  Pronunciation_Edu
//
//  Created by 전한경 on 2017. 3. 16..
//  Copyright © 2017년 jeon. All rights reserved.
//

import UIKit

class MainVC: UIViewController {

    @IBOutlet weak var gameStartBtn: UIButton!
    let word : [String] = ["새로운","활기찬","감격","감동란","발걸음"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "gameSegue"{
        let destination = segue.destination as! GameVC
            destination.receivedWord = word
        }
    }
    


}

