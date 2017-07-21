var locations = [
    {
        title: 'Kota Kachori',
        position: {lat: 12.936298, lng: 77.625429},
        address: '635, 100 Feet Rd, 6th Block, Indiranagar, Bengaluru, Karnataka 560095, India',
        placeId: 'ChIJL0R7XUMUrjsRvtH2I6WhCME'
    },
    {
        title: 'Stoner',
        position: {lat: 12.976307, lng: 77.64123099999999},
        address: '100 Feet Rd, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038, India',
        placeId: 'ChIJmfKV7KUWrjsRPLIaeB5UMCw'
    },
    {
        title: "Srinathji's",
        position: {lat: 12.9482427, lng: 77.69835139999999},
        address: '#5, Ground Floor, More Mega Store Premises, KBR Complex, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560037, India',
        placeId: 'ChIJCd00R7UTrjsRKWfEI0rqyjQ'
    },
    {
        title: 'Tabla',
        position: {lat: 12.9509933, lng: 77.69936229999999},
        address: '1st floor,Door No.2383/2, Soul Space Paradigm, Near Innovative Multiplex, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560037, India',
        placeId: 'ChIJC1vaxsoTrjsRkEs96mv6bsA'
    },
    {
        title: 'Vapour Pub and Brewery',
        position: {lat: 12.9695704, lng: 77.64110169999999},
        address: 'No. 773, HAL 2nd Stage, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038, India',
        placeId: 'ChIJjXpO8acWrjsRVrTLq_ga6Xw'
    },
    {
        title: 'Phoenix',
        position: {lat: 12.997572, lng: 77.69633899999999},
        address: 'Whitefield Main Road, Mahadevpura, Bengaluru, Karnataka 560048, India',
        placeId: 'ChIJS76jBAsRrjsRQ5Yuqy0l-88'
    },
    {
        title: 'VR Bengaluru',
        position: {lat: 12.996269, lng: 77.69527099999999},
        address: '60/2, ITPL Road, Bengaluru, Karnataka 560048, India',
        placeId: 'ChIJtV2JQAsRrjsRp4HCbaob4R0'
    },
    {
        title: 'ISKCON',
        position: {lat: 13.0096323, lng: 77.55107099999999},
        address: 'Hare Krishna Hill, Chord Road, Rajaji Nagar, Bengaluru, Karnataka 560010, India',
        placeId: 'ChIJBw42C-09rjsRs7KmQUqyf3o'
    },
    {
        title: 'Lalbagh Botanical Garden',
        position: {lat: 12.9507432, lng: 77.5847773},
        address: 'Lalbagh Botanical Garden, Mavalli, Bengaluru, Karnataka 560004, India',
        placeId: 'ChIJHdPykcEVrjsRIr4v35kLEY4'
    },
    {
        title: 'MTR',
        position: {lat: 12.955155, lng: 77.585466},
        address: '14, Lal Bagh Main Road, Sampangi Rama Nagar, Bengaluru, Karnataka 560027, India',
        placeId: 'ChIJaaWjpN0VrjsRAsmfiafDlN4'
    },
    {
        title: 'Orion Mall',
        position: {lat: 13.0107881, lng: 77.55490089999999},
        address: 'Brigade Gateway, 26/1 Dr. Rajkumar Road, Malleshwaram West, Bengaluru, Karnataka 560055, India',
        placeId: 'ChIJXwcMrykWrjsRVF3NIr1OmDw'
    },
    {
        title: 'Indira Gandhi Musical Fountain Park',
        position: {lat: 12.9852976, lng: 77.59061179999999},
        address: 'Indira Gandhi Musical Fountain Park, Opp to Jawahar Lal Nehru Planetarium, Raj Bhawan Road, Bengaluru, Karnataka 560052, India',
        placeId: 'ChIJ7ywPXWkWrjsROJGazHbfZhg'
    },
    {
        title: 'Jawaharlal Nehru Planetarium',
        position: {lat: 12.984865, lng: 77.5895718},
        address: 'Sri T. Choudaiah Road, High Grounds, Bengaluru, Karnataka 560001, India',
        placeId: 'ChIJk0gN-2sWrjsRljNKfECgL9M'
    },
    {
        title: 'Cubbon Park',
        position: {lat: 12.9763472, lng: 77.59292839999999},
        address: 'Cubbon Park, Behind High Court of Karnataka, Ambedkar Veedhi, Sampangi Rama Nagar, Bengaluru, Karnataka 560001, India',
        placeId: 'ChIJL2fQ53MWrjsRuN9D6aalLMY'
    },
    {
        title: 'The Black Pearl',
        position: {lat: 12.934465, lng: 77.616056},
        address: '105, 2nd & 3rd Floors, Vikas Tech Park, 5th Block 5th Block, Koramangala, Jyoti Nivas College Rd, Koramangala, Bengaluru, Karnataka 560095, India',
        placeId: 'ChIJjzdGKk4UrjsRKqnBh8iwPYQ'
    },
    {
        title: 'Truffles',
        position: {lat: 12.9334914, lng: 77.61428459999999},
        address: '93/A , Ground Floor , A Wing ,4th B Cross, 5th Block, Koramangala, Bengaluru, Karnataka 560095, India',
        placeId: 'ChIJdz4L2VEUrjsRvSsPGCwDl2I'
    },
    {
        title: 'NH-8',
        position: {lat: 12.973174, lng: 77.64676},
        address: 'No.710, 3rd Floor, 8th Main Road, Above New Bata Showroom, 80 Feet Road, Indranagar, Bengaluru, Karnataka 560037, India',
        placeId: 'ChIJQwb3cakWrjsR_0RpF3vzLJc'
    },
    {
        title: 'Sattvam',
        position: {lat: 13.0056818, lng: 77.58057579999999},
        address: '35, Opposite Shell Petrol Bunk, Sankey Road, Sadashivnagar, Bengaluru, Karnataka 560080, India',
        placeId: 'ChIJm1G1mDYWrjsRvmk1hrhV21Y'
    }
];

/* HTTP geolocaitn api to find the address of the particular area */
//https://maps.googleapis.com/maps/api/geocode/json?address=ISKCON+Bangalore&key=AIzaSyA31u0Hxmq37sPOLezIMM8wg0VLJd5E0Sg