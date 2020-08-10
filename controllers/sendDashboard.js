exports.getSendDashboard = (req, res, next) => {
    res.render('sendDashboard', {
        currentSends: [
            {
                status: 'Pending',
                statusDate: '12/26/2020',
                carrier: {
                    name: 'Suket Shah',
                    phoneNum: '214-425-0447',
                    email: 'suket.shah@yahoo.com',
                    price: '21'
                },
                package: {
                    title: 'Chicken Biryani',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
                    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
                    origin: 'Flower Mound, TX',
                    dest: 'Austin, TX',
                    date: 'September 16, 2020',
                    time: '12:30 PM',
                }
            },
            {
                status: 'Accepted',
                statusDate: '12/26/2020',
                carrier: {
                    name: 'Gabriel James',
                    phoneNum: '996-666-7894',
                    email: 'gjames@gmail.com',
                    price:'15'
                },
                package: {
                    title: 'Chicken Biryani',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
                    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
                    origin: 'Coppell, TX',
                    dest: 'Austin, TX',
                    date: 'August 20, 2020',
                    time: '12:30 PM',
                }
            }, 
            {
                status: 'Denied',
                statusDate: '12/26/2020',
                carrier: {
                    name: 'Suket Shah',
                    price: '13'
                },
                package: {
                    title: 'Chicken Biryani',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
                    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend venenatis quam, vel tincidunt augue facilisis vel. Morbi',
                    origin: 'Flower Mound, TX',
                    dest: 'Austin, TX',
                    date: 'May 16, 2019',
                    time: '12:30 PM',
                }
            }
        ]
    });
};