//
//  GameVC.swift
//  Pronunciation_Edu
//
//  Created by 윤민섭 on 2017. 3. 30..
//  Copyright © 2017년 jeon. All rights reserved.
//
import UIKit
import NaverSpeech

let nClientID = "p3P8WOtZvXwSbWcMZs5H"

class GameVC: UIViewController {
    
    var receivedWord : [String] = []
    var stageIndex : Int = 0
    
    @IBOutlet weak var wordLabel: UILabel!
    @IBOutlet weak var recognitionResultLabel: UILabel!
    @IBOutlet weak var recognitionButton: UIButton!
    fileprivate let speechRecognizer: NSKRecognizer
    fileprivate let languages = Languages()

    required init?(coder aDecoder: NSCoder) { // NSKRecognizer를 초기화 하는데 필요한 NSKRecognizerConfiguration을 생성
        let configuration = NSKRecognizerConfiguration(clientID: nClientID)
        configuration?.canQuestionDetected = true
        self.speechRecognizer = NSKRecognizer(configuration: configuration)
        super.init(coder: aDecoder)
        self.speechRecognizer.delegate = self
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.navigationBar.barTintColor = UIColor(red: 255/255, green: 0, blue: 51/255, alpha: 0.7)
        wordLabel.text = receivedWord[stageIndex]
        
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        if self.isViewLoaded && self.view.window == nil {
            self.view = nil
        }
    }
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()

    }
    
    @IBAction func backBtnAction(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func recognitionButtonTapped(_ sender: UIButton) {
        // 버튼 누르면 음성인식 시작
        if self.speechRecognizer.isRunning {
            self.speechRecognizer.stop()
        } else {
            self.speechRecognizer.start(with: self.languages.selectedLanguage)
            self.recognitionButton.isEnabled = false
        }
    }
    
    func showToast(_ msg:String) {
        let toast = UIAlertController()
        toast.message = msg;
        
        self.present(toast, animated: true, completion: nil)
        let duration = DispatchTime.now() + Double(Int64(2 * Double(NSEC_PER_SEC))) / Double(NSEC_PER_SEC)
        
        DispatchQueue.main.asyncAfter(deadline: duration) {
            toast.dismiss(animated: true, completion: nil)
            if (self.stageIndex == 5){
                self.dismiss(animated: true, completion: nil)
            }
        }
    }
 
}

extension GameVC: NSKRecognizerDelegate { //NSKRecognizerDelegate protocol 구현
    
    public func recognizerDidEnterReady(_ aRecognizer: NSKRecognizer!) {
        self.recognitionResultLabel.text = "인식중......"
        self.recognitionButton.setImage(UIImage(named: "mic_ing"), for: .normal)
        self.recognitionButton.isEnabled = true
    }
    public func recognizerDidDetectEndPoint(_ aRecognizer: NSKRecognizer!) {

    }
    public func recognizerDidEnterInactive(_ aRecognizer: NSKRecognizer!) {

        self.recognitionButton.isEnabled = true
    }
    public func recognizer(_ aRecognizer: NSKRecognizer!, didRecordSpeechData aSpeechData: Data!) {

    }
    public func recognizer(_ aRecognizer: NSKRecognizer!, didReceivePartialResult aResult: String!) {

        self.recognitionResultLabel.text = aResult
    }
    public func recognizer(_ aRecognizer: NSKRecognizer!, didReceiveError aError: Error!) {

        self.recognitionButton.isEnabled = true
    }
    public func recognizer(_ aRecognizer: NSKRecognizer!, didReceive aResult: NSKRecognizedResult!) {

        if let result = aResult.results.first as? String {
            self.recognitionButton.setImage(UIImage(named: "mic"), for: .normal)
            self.recognitionResultLabel.text = "나의 답 : " + result
            if result == receivedWord[stageIndex]{
                showToast("정답입니다👍")

            }else{
                showToast("틀렸습니다🙅🏻")
            }
            stageIndex += 1
            if stageIndex <= 4{
                wordLabel.text = receivedWord[stageIndex]
            }
            
        }
    }
}

fileprivate extension GameVC {
    
    func setRecognitionButtonTitle(withText text: String, color: UIColor) {
        self.recognitionButton.setTitle(text, for: .normal)
        self.recognitionButton.setTitleColor(color, for: .normal)
    }
}
