import React, { useEffect, useState } from 'react';
import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
import { useParams } from 'react-router-dom';

const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/';
const QUESTION_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/';

function StudentProgress() {
    const [questions, setQuestions] = useState([]);
    const [student, setStudent] = useState([]);

    const { studentId } = useParams();
  
    useEffect (() => {
        fetch(`${STUDENT_ENDPOINT}${studentId}/`)
        .then((response) => response.json())
        .then(data => {
            console.log("Student:",data);
            setStudent(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [studentId])

    useEffect (() => {
        fetch(QUESTION_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log("Questions:",data);
            setQuestions(data);
            })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect (() => {
        if (student && questions.length > 0) {
            calculateFrequencies(questions,student);
        }
    }, [student, questions])


    const calculateFrequencies = (questions: any, student: any) => {
        const questionFreqArray = []
        const typesAndFreq = [
            {
                subject: "Resistencias en serie y paralelo",
                frequency: 0,
            },
            {
                subject: "Kirchhoff - suma tensiones",
                frequency: 0,
            },
            {
                subject: "Kirchhoff - suma corrientes",
                frequency: 0,
            },
            {
                subject: "Tipos de condensadores",
                frequency: 0,
            },
            {
                subject: "Energía de un condensador",
                frequency: 0,
            },
            {
                subject: "Carga de un condensador",
                frequency: 0,
            }
        ]

        if (questions && student) {
            for (let i=0; i<questions.length; i++) {
                const questionFreq = {
                    question_id: questions[i].id,
                    frequency: 0,
                    subject: questions[i].type_subject
                }
                for (let k=0; k<student.correctly_answered_questions.length; k++) {
                        if (student.correctly_answered_questions[k] === questions[i].id) {
                            questionFreq.frequency += 1
                        }
                      }
                questionFreqArray.push(questionFreq)
            }
            console.log("Correct frequency per question:",questionFreqArray)

            for (let i=0; i<questionFreqArray.length; i++) {
                if (questionFreqArray[i].frequency > 0) {
                        if (questionFreqArray[i].subject === "Resistencias en serie y paralelo") {
                            typesAndFreq[0]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Kirchhoff - suma tensiones") {
                            typesAndFreq[1]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Kirchhoff - suma corrientes") {
                            typesAndFreq[2]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Tipos de condensadores") {
                            typesAndFreq[3]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Energía de un condensador") {
                            typesAndFreq[4]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Carga de un condensador") {
                            typesAndFreq[5]['frequency'] += questionFreqArray[i].frequency
                        }

                    console.log("types and freq", typesAndFreq)
                }
            }
        }
       return typesAndFreq;
    }

    const data = [
        {
          name: "Resistencias en serie y paralelo",
          value: calculateFrequencies(questions,student)[0].frequency,
          

          icon: function ResistanceIcon() {
            return (
                <svg fill="#000000" height="20px" width="27px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 462.782 462.782" className="">
                <g id="XMLID_21_">
                    <path id="XMLID_904_" d="M350.272,323.014c-5.974,0-11.411-3.556-13.783-9.091l-50.422-117.65l-40.505,116.662
                        c-2.08,5.989-7.699,10.023-14.038,10.08c-0.044,0-0.089,0-0.133,0c-6.286,0-11.911-3.921-14.081-9.831l-41.979-114.358
                        l-40.798,114.234c-2.095,5.867-7.599,9.828-13.827,9.952c-6.242,0.127-11.886-3.615-14.213-9.394l-31.482-78.172H0v-30h85.141
                        c6.121,0,11.627,3.719,13.914,9.396l20.511,50.93l41.446-116.048c2.124-5.947,7.745-9.927,14.06-9.955c0.022,0,0.044,0,0.066,0
                        c6.289,0,11.912,3.923,14.081,9.831l41.779,113.814l39.431-113.565c2.032-5.851,7.451-9.852,13.64-10.071
                        c6.203-0.217,11.877,3.389,14.317,9.082l49.683,115.927l15.254-48.815c1.957-6.262,7.756-10.526,14.317-10.526h85.141v30h-74.113
                        l-24.076,77.043c-1.873,5.994-7.281,10.186-13.553,10.506C350.784,323.007,350.527,323.014,350.272,323.014z"/>
                </g>
                </svg>
            );
          },
        },
        {
          name: "Kirchhoff - suma tensiones",
          value: calculateFrequencies(questions,student)[1].frequency,

          icon: function BoltIcon() {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              
            );
          },
        },
        {
          name: "Kirchhoff - suma corrientes",
          value: calculateFrequencies(questions,student)[2].frequency,

          icon: function BoltIcon() {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              
            );
          },
        },
        {
          name: "Tipos de condensadores",
          value: calculateFrequencies(questions,student)[3].frequency,

          icon: function CondensatorIcon() {
            return (
                <svg xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 245 512.286"
                className="w-5 h-5 mr-2">
                    <path d="M28.098 0h188.804C232.356 0 245 12.656 245 28.099v187.356c-19.547 1.435-34.961 17.748-34.961 37.662 0 19.914 15.414 36.226 34.961 37.661v29.493c0 3.711-3.048 6.758-6.758 6.758h-36.098v130.225c0 .959-.874 1.747-1.94 1.747h-26.217c-1.066 0-1.94-.786-1.94-1.747V327.029H72.953v183.317c0 1.066-.873 1.94-1.94 1.94H44.796a1.946 1.946 0 01-1.94-1.94V327.029H6.769c-3.716 0-6.769-3.045-6.769-6.768v-29.386c20.59-.31 37.186-17.095 37.186-37.758 0-20.663-16.596-37.449-37.186-37.759V28.099C0 12.645 12.644 0 28.098 0zm159.243 40.762a8.75 8.75 0 0117.496 0v28.406a8.75 8.75 0 01-17.496 0V40.762zm0 66.336a8.748 8.748 0 0117.496 0v84.143a8.75 8.75 0 01-17.496 0v-84.143z"/>
                </svg>
            );
          },
        },
        {
          name: "Energía de un condensador",
          value: calculateFrequencies(questions,student)[4].frequency,

          icon: function CondensatorIcon() {
            return (
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="20px" height="20px" viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
                className="mr-2">

                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M1993 5096 l-28 -24 -3 -291 -3 -290 -32 -6 c-18 -3 -77 -12 -132
                -20 -446 -69 -763 -208 -835 -367 -17 -38 -20 -67 -20 -253 l0 -210 29 -60
                c26 -56 107 -145 131 -145 6 0 10 -30 10 -75 0 -73 -1 -75 -30 -90 -47 -24
                -99 -75 -121 -116 -19 -37 -19 -71 -19 -1359 0 -1302 0 -1321 20 -1363 44 -93
                149 -172 317 -237 642 -251 1924 -251 2566 0 168 65 273 144 317 237 20 42 20
                61 20 1363 0 1288 0 1322 -19 1359 -22 41 -74 92 -121 116 -29 15 -30 17 -30
                90 0 45 4 75 10 75 24 0 105 89 131 145 l29 60 0 210 c0 186 -3 215 -20 253
                -72 159 -389 298 -835 367 -55 8 -115 17 -132 20 l-33 6 0 277 c0 201 -4 284
                -13 302 -27 54 -94 63 -137 20 -19 -19 -20 -35 -20 -297 l0 -278 -430 0 -430
                0 0 272 c0 149 -3 279 -6 288 -8 19 -55 45 -83 45 -11 0 -33 -11 -48 -24z
                m986 -760 c7 -5 11 -64 11 -180 0 -160 2 -175 21 -200 16 -20 29 -26 57 -26
                79 1 92 34 92 236 l0 154 23 -5 c12 -2 81 -14 152 -26 370 -60 675 -186 675
                -279 0 -95 -314 -221 -711 -284 -249 -40 -412 -51 -739 -51 -490 0 -833 44
                -1150 147 -174 56 -300 135 -300 188 0 92 306 219 675 279 72 12 140 24 153
                26 l22 5 0 -154 c0 -201 13 -235 91 -236 67 0 73 17 79 224 l5 181 85 6 c109
                8 744 4 759 -5z m-1604 -683 c133 -43 242 -68 405 -93 74 -11 145 -23 158 -26
                21 -4 22 -9 22 -87 l0 -83 -102 13 c-291 37 -651 159 -722 244 -21 25 -26 41
                -26 88 l0 58 83 -41 c45 -23 127 -56 182 -73z m2620 -19 c-24 -38 -108 -86
                -227 -133 -162 -63 -308 -97 -570 -134 l-38 -6 0 84 c0 80 1 85 23 89 12 3 83
                15 157 26 242 37 442 93 585 165 l80 40 3 -53 c2 -37 -2 -62 -13 -78z m-1005
                -1786 l0 -1657 -57 -8 c-75 -10 -671 -10 -745 0 l-58 8 0 1657 0 1657 430 0
                430 0 0 -1657z m-1595 1458 c113 -36 273 -72 395 -91 58 -9 120 -18 138 -21
                l32 -5 0 -209 0 -210 -24 0 c-41 0 -256 39 -381 69 -251 61 -455 167 -443 230
                2 9 25 30 51 47 91 60 117 101 117 188 0 31 3 36 18 32 9 -3 53 -16 97 -30z
                m2445 -2 c0 -87 26 -128 117 -188 26 -17 49 -38 51 -47 12 -63 -192 -169 -443
                -230 -125 -30 -340 -69 -381 -69 l-24 0 0 210 c0 116 3 210 8 210 4 0 77 11
                162 24 156 25 339 68 440 105 72 26 70 26 70 -15z m-2662 -513 c152 -76 393
                -142 662 -180 l115 -17 3 -1192 2 -1192 -22 0 c-38 0 -257 39 -348 61 -212 53
                -375 120 -442 183 l-38 35 0 1165 c0 642 2 1166 5 1166 3 0 31 -13 63 -29z
                m2832 -1137 l0 -1165 -37 -35 c-68 -63 -231 -130 -443 -183 -91 -22 -310 -61
                -348 -61 l-22 0 2 1192 3 1192 115 17 c270 38 521 107 665 182 28 14 53 26 58
                27 4 0 7 -524 7 -1166z"/>
                <path d="M2429 3151 c-43 -14 -77 -41 -101 -80 -22 -35 -23 -46 -26 -303 -4
                -314 2 -359 55 -411 41 -41 96 -57 203 -57 107 0 162 16 203 57 53 52 59 97
                55 411 -3 258 -4 268 -26 304 -42 68 -80 83 -217 85 -66 1 -132 -1 -146 -6z
                m216 -421 l0 -255 -85 0 -85 0 -3 245 c-1 134 0 251 3 258 3 9 26 12 87 10
                l83 -3 0 -255z"/>
                <path d="M2444 1361 c-52 -13 -91 -42 -116 -85 -23 -41 -23 -45 -23 -342 l0
                -300 27 -42 c45 -68 72 -77 228 -77 156 0 183 9 228 77 l27 42 0 300 c0 298 0
                301 -24 342 -38 67 -85 87 -211 90 -58 2 -119 0 -136 -5z m204 -423 l-3 -253
                -85 0 -85 0 -3 253 -2 252 90 0 90 0 -2 -252z"/>
                </g>
                </svg>
            );
          },
        },
        {
            name: "Carga de un condensador",
            value: calculateFrequencies(questions,student)[5].frequency,
  
            icon: function BatteryIcon() {
              return (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                  </svg>
              );
            },
          },
      ];

    return (
        <div>
            <Card className="w-96">
                <Title> Progress by subject </Title>
                <Flex className="mt-4">
                <Text>
                    <Bold> Subject </Bold>
                </Text>
                <Text>
                    <Bold> Correct Answers </Bold>
                </Text>
                </Flex>
                <BarList data={data} className="mt-2" />
            </Card>
        </div>
    )
}

export default StudentProgress;