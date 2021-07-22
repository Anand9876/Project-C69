import React,{Component} from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Image, ImageBackground} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            Scanned:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission:status==="granted",
            scanned:false,
            buttonState:'clicked'
        });
    }
     handleBarCodeScanned=async({type,data})=>{
         this.setState({
             scanned:true,
             Scanned:data,
             buttonState:'normal'
         })
     }

    render(){
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;

       if(hasCameraPermission && buttonState==='clicked'){
        return(
          <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}>
          </BarCodeScanner>
        )

       }else if(buttonState==='normal'){
           return(
               <View  style={{backgroundColor:'orange', flex: 1,
               justifyContent: 'center',
               alignItems: 'center',width:1515,borderColor:'black',borderWidth:20,borderRadius:20}}>
               <ImageBackground source={require('../assets/react.png')} style={{width:1200,height:500}}>
               <View style={styles.container}>
                   <Image source={require('../assets/scanner.jpg')} style={styles.image}></Image>
<Text style={styles.displayText}>{hasCameraPermission===true?this.state.Scanned:"Request for Camera Permissions"}</Text>
<TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission} title="Bar Code Scanner">
<Text style={styles.buttonText}>Scan QR code</Text>
</TouchableOpacity>
               </View>
               </ImageBackground>
               </View>
           )
       }
    }
}
const styles=StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    displayText:{
      fontSize: 20,
      textDecorationLine: 'underline',
      color:'orange',
      fontWeight:'bold'
    },
    scanButton:{
      backgroundColor: 'black',
      padding: 10,
      margin: 10,
      borderRadius:20

    },
    buttonText:{
      fontSize: 20,
      color:'white',

    },
    image:{
        width:100,
        height:100,
        borderRadius:20
    }
})