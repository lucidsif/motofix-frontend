const manufacturerCodes =  [{'Aprilia':'APR'},{'Arctic Cat':'ARC'},{'Benelli':'BEN'},{'BMW':'BMM'},{'BSA':'BSA'},{'Buell':'BUE'},{'Cagiva':'CAG'},{'Can-Am':'CAA'},{'Cannondale':'CAN'},{'CZ':'CZ-'},{'Derbi':'DER'},{'Ducati':'DUC'},{'EBR Motorcycles':'EBR'},{'Enfield':'ENF'},{'Eurospeed':'EUR'},{'Gas Gas':'GGS'},{'Harley-Davidson':'HAR'},{'Honda':'HDA'},{'Husqvarna':'HUS'},{'Hyosung':'HYO'},{'Indian':'IND'},{'Italjet':'ITA'},{'Jawa':'JAW'},{'Kawasaki':'KAW'},{'Keeway':'KEE'},{'KTM':'KTM'},{'Kymco':'KYM'},{'Laverda':'LAV'},{'Morini':'MOR'},{'Moto Guzzi':'MOT'},{'MV Agusta':'MVA'},{'MZ/MUZ':'MZ-'},{'Piaggio':'PIA'},{'Polaris':'POL'},{'Suzuki':'SZK'},{'SYM':'SYM'},{'TGB':'TGB'},{'Triumph':'TRI'},{'Ural':'URA'},{'Victory':'VIC'},{'Indian':'IND'},{'Italjet':'ITA'},{'Jawa':'JAW'},{'Kawasaki':'KAW'},{'Keeway':'KEE'},{'KTM':'KTM'},{'Kymco':'KYM'},{'Laverda':'LAV'},{'Morini':'MOR'},{'Moto Guzzi':'MOT'},{'MV Agusta':'MVA'},{'MZ/MUZ':'MZ-'},{'Piaggio':'PIA'},{'Polaris':'POL'},{'Suzuki':'SZK'},{'SYM':'SYM'},{'TGB':'TGB'},{'Triumph':'TRI'},{'Ural':'URA'},{'Victory':'VIC'}]
var manufacturerList = []

function createManufacturersList() {
  manufacturerCodes.map((tuple) => {
    for (var manufacturerName in tuple) {
      manufacturerList.push( {label: manufacturerName, value: tuple[manufacturerName]  });
    }
  });
}

createManufacturersList()

export default manufacturerList
