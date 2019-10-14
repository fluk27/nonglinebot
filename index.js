const express = require("express");
const line = require("@line/bot-sdk");
const { DB } = require("./connect");
require("dotenv").config();
const request = require("request");
const app = express();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./demo1.sqlite", err => {
  console.log(err);
});
// console.log(MSG.data1)
//console.log(address.MSG);

app.get("/data/sql",async (req, res) => {
  let data = [];
    await db.all("SELECT * FROM question", [], (err, row) => {
    // console.dir(row);
    data.push(row);
    row.map(item => {
      console.dir(item);
    });
    res.status(200).json(data)
  })
 
  
  
  // db.all("INSERT INTO  question(question) VALUES(?)",['555'], err => {
  //   if (err) console.dir(err.message);
  // });

});

// let headersOpt = {
//   "content-type": "application/json",
// };
// //  app.get('/data', (req, res) => {
// //    request.post({
// //     uri: 'https://gentle-springs-32390.herokuapp.com/test',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ "name": "ขอเย็ดหีน้องโยสักทีนะ" })
// //   })
// // res.end("test")
// // })

app.get("/data", (req, res) => {
  let result = [];
  DB.firestore()
    .collection("user")
    .get()
    .then(data => {
      data.forEach(doc => {
        result.push(doc.data());
        
      });
      res.status(200).json(result)
    })
    .catch(err => {
      res.send(err);
    });
});

const config = {
  channelAccessToken:
    "i1OHiHCFB3EihyJLfryerCYEdrDIk5NJrttNkMTld6iXZF3hEJDfPPD0a84nyBXKDjPvnmTU058453ujUM5v74qwSCXepNYK9Paljl3KtBqbQG6zX8oceJMC6deKz7vgspNCDXBlWOIpTsaO6CHX1AdB04t89/1O/w1cDnyilFU=",
  channelSecret: "7c31a9a3258411de1a1de397e23c96b9"
};

const client = new line.Client(config);

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

function handleEvent(event) {
  console.log(event);
  if (event.type === "message" && event.message.type === "text") {
    handleMessageEvent(event);
  } else {
    return Promise.resolve(null);
  }
}

function handleMessageEvent(event) {
  var msg = {
    type: "text",
    text: "สวัสดีครัช"
  };

  var eventText = event.message.text.toLowerCase();

  if (eventText === "image") {
    msg = {
      type: "image",
      originalContentUrl:
        "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
      previewImageUrl:
        "https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430"
    };
  } else if (eventText === "locatio") {
    msg = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "bubble",
        direction: "ltr",
        hero: {
          type: "image",
          url:
            "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            label: "Action",
            uri: "https://linecorp.com"
          }
        },
        body: {
          type: "box",
          layout: "vertical",
          spacing: "md",
          action: {
            type: "uri",
            label: "Action",
            uri: "https://linecorp.com"
          },
          contents: [
            {
              type: "text",
              text: "Brown's Burger",
              size: "xl",
              weight: "bold"
            },
            {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  contents: [
                    {
                      type: "icon",
                      url:
                        "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                    },
                    {
                      type: "text",
                      text: "$10.5",
                      flex: 0,
                      margin: "sm",
                      weight: "bold"
                    },
                    {
                      type: "text",
                      text: "400kcl",
                      size: "sm",
                      align: "end",
                      color: "#AAAAAA"
                    }
                  ]
                },
                {
                  type: "box",
                  layout: "baseline",
                  contents: [
                    {
                      type: "icon",
                      url:
                        "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_large_32.png"
                    },
                    {
                      type: "text",
                      text: "$15.5",
                      flex: 0,
                      margin: "sm",
                      weight: "bold"
                    },
                    {
                      type: "text",
                      text: "550kcl",
                      size: "sm",
                      align: "end",
                      color: "#AAAAAA"
                    }
                  ]
                }
              ]
            },
            {
              type: "text",
              text: "Sauce, Onions, Pickles, Lettuce & Cheese",
              size: "xxs",
              color: "#AAAAAA",
              wrap: true
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "spacer",
              size: "xxl"
            },
            {
              type: "button",
              action: {
                type: "uri",
                label: "Add to Cart",
                uri: "https://linecorp.com"
              },
              color: "#905C44",
              style: "primary"
            }
          ]
        }
      }
    };
  } else if (eventText === "template button") {
    msg = {
      type: "template",
      altText: "this is a buttons template",
      template: {
        type: "buttons",
        thumbnailImageUrl:
          "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
        title: "Menu",
        text: "Please select",
        actions: [
          {
            type: "postback",
            label: "Buy",
            data: "action=buy&itemid=123"
          },
          {
            type: "postback",
            label: "Add to cart",
            data: "action=add&itemid=123"
          },
          {
            type: "uri",
            label: "View detail",
            uri: "http://example.com/page/123"
          }
        ]
      }
    };
  } else if (eventText === "template confirm") {
    msg = {
      type: "template",
      altText: "this is a confirm template",
      template: {
        type: "confirm",
        text: "Are you sure?",
        actions: [
          {
            type: "message",
            label: "Yes",
            text: "yes"
          },
          {
            type: "message",
            label: "No",
            text: "no"
          }
        ]
      }
    };
  } else if (eventText === "carousel") {
    msg = {
      type: "template",
      altText: "this is a carousel template",
      template: {
        type: "carousel",
        columns: [
          {
            thumbnailImageUrl:
              "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
            title: "this is menu",
            text: "description",
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=111"
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=111"
              },
              {
                type: "uri",
                label: "View detail",
                uri: "http://example.com/page/111"
              }
            ]
          },
          {
            thumbnailImageUrl:
              "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
            title: "this is menu",
            text: "description",
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=222"
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=222"
              },
              {
                type: "uri",
                label: "View detail",
                uri: "http://example.com/page/222"
              }
            ]
          }
        ]
      }
    };
  } else {
    if (eventText !== "hello, world" && eventText !== null) {
      db.all("INSERT INTO  question(question) VALUES(?)", [eventText], err => {
        if (err) console.dir(err.message);
      });
    }

    DB.firestore()
      .collection("user")
      .add({ question: eventText })
      .then(res => {
        res.id;
      });
  }

  return client.replyMessage(event.replyToken, msg);
}

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function() {
  console.log("run at port", app.get("port"));
});
