import React from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { currentTransactionsSelector } from "../../shared/globalState";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LogarithmicScale,
  Tooltip,
  PointElement,
  LineElement
);

const TO_NANO = 1.0 / Math.pow(10, 30);

export default function BarGraph(props) {
  const transactions = useRecoilValue(currentTransactionsSelector);
  console.log(transactions);

  if (!transactions) return null;

  return (
    <div>
      <Scatter
        data={{
          labels: transactions.map((x) => x.txNumber),
          datasets: [
            {
              label: "Transaction Value",
              data: transactions.map((x) => x.amount * TO_NANO),
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={300}
        options={{
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                borderColor: 'black',
                borderWidth: 2,
                display: false,
              },
              title: {
                display: true,
                color: 'black',
                text: 'Internal Tx Number',
              },
              ticks: {
                color: 'black',
              },
            },
            y: {
              grid: {
                borderColor: 'black',
                borderWidth: 2,
                // display: false,
              },
              title: {
                display: true,
                color: 'black',
                text: 'Transaction Value',
              },
              type: "logarithmic",
              ticks: {
                color: 'black',
                min: 0.1,
                max: 1000000,
                callback: function (value, index, values) {
                    if (value === 1000000) return "1M";
                    if (value === 100000) return "100K";
                    if (value === 10000) return "10K";
                    if (value === 1000) return "1K";
                    if (value === 100) return "100";
                    if (value === 10) return "10";
                    if (value === 1) return "1";
                    if (value === 0.1) return "0.1";
                    return null;
                }
              },
            },
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
}

// https://stackoverflow.com/questions/30307801/how-to-assign-a-logarithmic-scale-to-y-axis-in-chart-js

// [
//   {
//       "_id": "wgtSJJGvdsHqWKGbe",
//       "txid": "416D026DC153352A0E894B2B52930E3B45EA184710BFF628DD6994C9E0229EEF",
//       "amount": "0",
//       "type": "change",
//       "account": "nano_3tura8g7m7pgrmbxpb8ochtgq3maebd6ayi9tqchchbya9zpa1sfhwugkpmc",
//       "linkAsAccount": "nano_1111111111111111111111111111111111111111111111111111hifc8npp",
//       "time": "1652353398585",
//       "txNumber": 645
//   },
//   {
//       "_id": "57J7DDMYuYDzSnfy7",
//       "txid": "68E0EFB0CFC09735C242845E43BF7A8EEC8BC7F6F1BDC595E7248791878EB2B6",
//       "amount": "2100000000000000000000000000000",
//       "type": "receive",
//       "account": "nano_3enfcrkyofmtd9ehs31nrexfrbh4z3qknso9a36tauhcytkb85t9puoyssaw",
//       "linkAsAccount": "nano_1eqozdm138kh18xd77hqi5idda4hfd9dz7dofb3ayazfabbskcubk3458n4y",
//       "time": "1652353402307",
//       "txNumber": 646
//   },
//   {
//       "_id": "Q66pwWTo5JvFxtQqr",
//       "txid": "682CB0B636238538D5157561D5CE7ECBAA29BCEC98651993A4A2938C21DB805D",
//       "amount": "518550000000000000000000000",
//       "type": "send",
//       "account": "nano_1jze45fugj18yaj1f53ihg9k64u93xsfmsaipwhkeonm5hbgacn6s7apydt4",
//       "linkAsAccount": "nano_33p76t8kfre5yep5tkucmo3kpgrhztcjiusysz5xtjbgdjr681zj4mrg7o4r",
//       "time": "1652353403687",
//       "txNumber": 647
//   },
//   {
//       "_id": "5Gwhs66Ri5cTwPJLv",
//       "txid": "1127C12FD515B1E75C48C3B3555A9025909FA38F602ADE8B757DB57C3A8DC746",
//       "amount": "2100000000000000000000000000000",
//       "type": "send",
//       "account": "nano_3enfcrkyofmtd9ehs31nrexfrbh4z3qknso9a36tauhcytkb85t9puoyssaw",
//       "linkAsAccount": "nano_3hs7yuic3kzro4grxmke4tp9ysrixwxy6u85zcnpj5sspupd35ckw71pip6r",
//       "time": "1652353405368",
//       "txNumber": 648
//   },
//   {
//       "_id": "5y7juHEuZChBdHpkj",
//       "txid": "3F2B23C034149CC92E5F7385E5D3C3F69F6DE1623426EB73390ABC0344C3583E",
//       "amount": "2100000000000000000000000000000",
//       "type": "receive",
//       "account": "nano_3hs7yuic3kzro4grxmke4tp9ysrixwxy6u85zcnpj5sspupd35ckw71pip6r",
//       "linkAsAccount": "nano_16b9r6qxc7fjwxg6jixmcofb1beimyjryr3cut7qczfohixaujt817oknoii",
//       "time": "1652353407311",
//       "txNumber": 649
//   },
//   {
//       "_id": "rQutsAAgL2ZARmE4S",
//       "txid": "C4CAB0C851C34A052A55A9C86D01EF6F202C5FC02EF8CCEDC2174F40658BA8E8",
//       "amount": "100000000000000000000000000",
//       "type": "send",
//       "account": "nano_3rksbipm1b1g64gw6t36ufc77q7mtw1uybnto4xyn1e7ae5aikyknb9fg4su",
//       "linkAsAccount": "nano_35ajn3f768539snt6q71g49hsf48mysifsj11t7rztmefstzfdtx6gp4acd5",
//       "time": "1652353410312",
//       "txNumber": 650
//   },
//   {
//       "_id": "uqMHXtjWKRWcEQPBA",
//       "txid": "CE40DA69055C52DB954516502463C6CEFF7E6EEA275BC2B4CC6EB6FB3D3EB128",
//       "amount": "600000000000000000000000000",
//       "type": "send",
//       "account": "nano_16jop7oaxjbef6cc5b47sixed5nt6mka6tmfy6gfx57gwrdsk9h1mygfc6z3",
//       "linkAsAccount": "nano_1samzrynzdjcqzcxj11znxixjcy3oguomrz5ia7bc1hcbut75gofj4hzmyst",
//       "time": "1652353411988",
//       "txNumber": 651
//   },
//   {
//       "_id": "qj3fxjWJsSCpSuo2h",
//       "txid": "273C4E1CB5173109033D2124BED53875FF7D06E32A1F271B0D4A220CCA213027",
//       "amount": "29999999999999996275458048",
//       "type": "send",
//       "account": "nano_1getxno5u6red5hzm3cxrdnrhspfzonytefbh86pju5rchcf7zapa8ctnf7x",
//       "linkAsAccount": "nano_1mrunxx5n84t16p33rwpiizbk95td9qfikdk11j8htfz7koi3q4zk8fyt3r8",
//       "time": "1652353413159",
//       "txNumber": 652
//   },
//   {
//       "_id": "cxPfnWT2jjZ5fyyPq",
//       "txid": "A57D6C611046EF2212B6357E1485A6A9B15F5FEAFD258E19609F65E3E26F378F",
//       "amount": "300000000000000000000000000",
//       "type": "send",
//       "account": "nano_1odyzdkiaszjhapmemfwste6akzcktq9bh8seahp3777et8g4567y63nxz6n",
//       "linkAsAccount": "nano_1wn5qr64dboc9643h4d6fffcn48pugwjmbmhf3z9qzqjtyiaxhgcnmhiheau",
//       "time": "1652353413858",
//       "txNumber": 653
//   },
//   {
//       "_id": "anXE6Xea3ZdkphjET",
//       "txid": "75E90DC860BE045104718BE8E0F7DAE4A15283FBADD6ABA0B2D0A8580270B1D1",
//       "amount": "150000000000000000000000000",
//       "type": "send",
//       "account": "nano_18rtodfdzxqprb5pamok8surdg91x7wys8yk47uk3xp7cyu3nuc44teysix1",
//       "linkAsAccount": "nano_1y1y58f3c4uxei6qkyec7o3r9xtmkbwawh63nb3nd387uhjtnw63ijxoz8gg",
//       "time": "1652353417549",
//       "txNumber": 654
//   },
//   {
//       "_id": "cH5SbtrF77yg6QsQz",
//       "txid": "2164FD310F68BD8636BB930E17671665A04DB15DAA8FDAAF380CF1DCA8218029",
//       "amount": "10000000000000000000000000",
//       "type": "send",
//       "account": "nano_3dropio1aj6yttxeqf7wm16u3eofx7kkcff5ytcy9m11zxh3uj6r9k5yussb",
//       "linkAsAccount": "nano_35ajn3f768539snt6q71g49hsf48mysifsj11t7rztmefstzfdtx6gp4acd5",
//       "time": "1652353425106",
//       "txNumber": 655
//   },
//   {
//       "_id": "LzSWkWeiDtKnwWh6p",
//       "txid": "90620B7D5D5EFE436C23F8B93A50E9DE338D949A7D81E77DE72ED4ADAFB0ED2C",
//       "amount": "1629523540000000000000000000000",
//       "type": "receive",
//       "account": "nano_1etto78drszxhtb5jhswzzm5m98ffqxwjzwg3gr8ajt5sq4ahdj4bjhni9we",
//       "linkAsAccount": "nano_393zjhmwpbtbz8nqdrbxm7rjm1beqx7kutrjb19r5435dbjm11ud9qf11jdn",
//       "time": "1652353426534",
//       "txNumber": 656
//   },
//   {
//       "_id": "fAsbcmsSXMcptNpgD",
//       "txid": "FFE0A5578D71FB86894225AC9C6ACCFAD2FADA14AF305FD23E1176D696256F29",
//       "amount": "2100000000000000000000000000000",
//       "type": "send",
//       "account": "nano_3wbbh9hg747tx1wg5zedkihywa9unny4hkwjhxajnhhh4ebea4igz8xzuhbr",
//       "linkAsAccount": "nano_1pnano9tonutqjnaf7ko5r5suznc5e1m5iq9x6cfuttbx5bbjtosenfzds7i",
//       "time": "1652353427437",
//       "txNumber": 657
//   },
//   {
//       "_id": "ZNK4xnRM2RDLq7djB",
//       "txid": "115CA88125BD0C6A46ABB703028D3E5FE48D9C397304D80765F654E403641B73",
//       "amount": "1841000000000000000000000000",
//       "type": "send",
//       "account": "nano_1tipnanogsu7q59pnie3qfc4w378wm43fg4ksqc8wmnnfnizrq1xrpt5geho",
//       "linkAsAccount": "nano_174oyimzpmkqcgqye4omqt47dm5qk85r3s9azjfw4gjronee3cnu9pkymhcr",
//       "time": "1652353427894",
//       "txNumber": 658
//   },
//   {
//       "_id": "j6qZEEMXcR3g4gpBX",
//       "txid": "A7CAAA5954579A2729508F98C3CE0C5AB2A1D18E45B669DC4361DBFFBD133AF0",
//       "amount": "100000000000000000000000000",
//       "type": "send",
//       "account": "nano_3rksbipm1b1g64gw6t36ufc77q7mtw1uybnto4xyn1e7ae5aikyknb9fg4su",
//       "linkAsAccount": "nano_1g1iqhe8dt7ptmpngqfwdsow5jbphfitfbh85tokh8yu7dm8jzbfjunktbo8",
//       "time": "1652353429995",
//       "txNumber": 659
//   },
//   {
//       "_id": "exWQq2SD8EbbcSnhw",
//       "txid": "BD2EEAB8761472C6E7905381FE7A9CC79EC52A848A178E3314898F419DB94B31",
//       "amount": "2100000000000000000000000000000",
//       "type": "receive",
//       "account": "nano_1pnano9tonutqjnaf7ko5r5suznc5e1m5iq9x6cfuttbx5bbjtosenfzds7i",
//       "linkAsAccount": "nano_3zz1nodrtwhuit6n6bfemjoesypkzdf3bdsidzb5w6dpttd4cusb1ozwpjtq",
//       "time": "1652353430007",
//       "txNumber": 660
//   },
//   {
//       "_id": "2G98R2KnpTyxTvnmK",
//       "txid": "71AA0C6109D1B227A468FEF1882D1A8302372C70C741B472AAF8EE4D99E87523",
//       "amount": "1000000000000000000000000000",
//       "type": "send",
//       "account": "nano_3rksbipm1b1g64gw6t36ufc77q7mtw1uybnto4xyn1e7ae5aikyknb9fg4su",
//       "linkAsAccount": "nano_19dwc97adhfngpuk5n8u6tsro3tirny367nakof5auhh8j17ot99k9nesj6n",
//       "time": "1652353431549",
//       "txNumber": 661
//   },
//   {
//       "_id": "ATSD44mHv9FW32eRD",
//       "txid": "59698E2EE13BA7B3D9B6B7EBE15EAD4FC17C738363BA245496E4E8890106C231",
//       "amount": "1477000000000000000000000000",
//       "type": "send",
//       "account": "nano_3pnano8dkuzfyt3hjnerdi38xcyt8anjyjqs1sieg8attxwskxz6effyqr6b",
//       "linkAsAccount": "nano_1dg67gtga37qit81ks31irgo65jdtu4sau1bamr3jxz7ga3dnbo7w6wawtbf",
//       "time": "1652353434883",
//       "txNumber": 662
//   },
//   {
//       "_id": "t5Y3HHPbSASFBHnpe",
//       "txid": "9038A6DB2EDD5FAFE5801CD4A2193A417978FE07F76B952D807D02234241EC22",
//       "amount": "14956556550000000000000000000000",
//       "type": "send",
//       "account": "nano_1xoo3boam6omijc3umdhqk7a5ux7s8gtsne7a6wrwqoked7pykx9zcua8nj3",
//       "linkAsAccount": "nano_38xrw1dmmykjk5b4e9j7y9au71pac67r4gufax47due1d6urgw371na5oupt",
//       "time": "1652353436021",
//       "txNumber": 663
//   },
//   {
//       "_id": "vW7BTjzNTuNFifska",
//       "txid": "2B2DBAFC38C60D5DCC86D556970890A7EC138367C5222F0217E21B87BD067466",
//       "amount": "14956556550000000000000000000000",
//       "type": "receive",
//       "account": "nano_38xrw1dmmykjk5b4e9j7y9au71pac67r4gufax47due1d6urgw371na5oupt",
//       "linkAsAccount": "nano_363rnufkxqczozkr198nnaemnidsh5z1hxudknpr1za46f365u34qe7ih1ra",
//       "time": "1652353436781",
//       "txNumber": 664
//   }
// ]
