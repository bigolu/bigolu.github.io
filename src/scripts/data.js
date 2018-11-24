import biggs from "../assets/biggs.gif"
import github from "../assets/github.png"
import linkedin from "../assets/linkedin.png"
import soundcloud from "../assets/soundcloud.png"

export default {
  "about": {
    "pic": {alt: 'pixelart image of Biggie', src: biggs},
    "email": "hi [at] bigo {dot} lu",
    "links": [
      {
        "src": github, "alt": "github logo", href: 'https://github.com/bigolu/'
      },
      {
        "src": soundcloud, "alt": "soundcloud logo", href: 'https://soundcloud.com/bigolu'
      },
      {
        "src": linkedin, "alt": "linkedin logo", href: 'https://www.linkedin.com/in/bigolu/'
      }
    ]
  },
  "works": {
    "categories": [
      {
        "name": "Experience",
        "items": [
          {
            "title": "Facebook",
            "image": "images/facebook.png",
            "description": "Developed a tool to automate the integration of other teams with the platform responsible for handling all messages and notifications in Messenger.",
            "links": [
              {
                "text": "facebook.com",
                "href": "https://www.facebook.com"
              }
            ]
          },
          {
            "title": "Pinterest",
            "image": "images/pinterest.png",
            "description": "Interned on the data engineering team. Worked mostly with Apache Kafka to improve the creation of data pipelines for new Kafka topics.",
            "links": [
              {
                "text": "pinterest.com",
                "href": "https://www.pinterest.com"
              }
            ]
          },
          {
            "title": "Skillshare",
            "image": "images/skillshare.jpg",
            "description": "Interned on the web team. Developed the front-end and back-end for new features on the site.",
            "links": [
              {
                "text": "skillshare.com",
                "href": "https://www.skillshare.com"
              }
            ]
          },
          {
            "title": "HackNY",
            "image": "images/hackny.png",
            "description": "Spent the summer living with awesome developers and mentors. Also had a great speaker series with inspiring figures in tech.",
            "links": [
              {
                "text": "hackny.org",
                "href": "http://hackny.org"
              }
            ]
          },
          {
            "title": "Rutgers",
            "image": "images/rutgers.jpeg",
            "description": "Lead two classes of 15 students each as a teaching assistant in Introduction to Computer Science. Conducted workshops, tutored, and graded assignments.",
            "links": []
          },
          {
            "title": "Rutgers",
            "image": "images/rutgers.jpeg",
            "description": "Helped develop a backend to generate and grade quizzes for the ~10,000 students enrolled in a Chemistry or Mathematics class at Rutgers.",
            "links": []
          },
          {
            "title": "Rutgers",
            "image": "images/rutgers.jpeg",
            "description": "Tutored students in Data Structures, Computer Architecture, Systems Programming, and assisted with debugging.",
            "links": [
              {
                "text": "the cave",
                "href": "https://www.cs.rutgers.edu/resources/cave"
              }
            ]
          }
        ]
      },
      {
        "name": "Projects",
        "items": [
          {
            "title": "tabbo",
            "image": "images/tabbo.jpg",
            "description": "A hotkeys management tool built specially for Google Chrome.",
            "links": [
              {
                "text": "try it",
                "href": "https://chrome.google.com/webstore/detail/tabbo/hedbkonckghacebehjebpfknhdbobiko?hl=en"
              },
              {
                "text": "github",
                "href": "https://github.com/hackny2016labs/tabbo"
              }
            ]
          },
          {
            "title": "notes-cli",
            "image": "images/notes-cli.png",
            "description": "A command line interface for your notes so that you never have to google those arbitrary commands again.",
            "links": [
              {
                "text": "github",
                "href": "https://github.com/bigolu/notes-cli"
              }
            ]
          },
          {
            "title": "Shrednought",
            "image": "images/shrednought.jpg",
            "description": "A shooter game made in Unity3D using a real guitar as a controller!",
            "links": [
              {
                "text": "video",
                "href": "https://www.youtube.com/watch?v=Vxwh66scEHw&feature=youtu.be"
              },
              {
                "text": "github",
                "href": "https://github.com/9/Shrednought"
              }
            ]
          },
          {
            "title": "ShadowrealmVR",
            "image": "images/shadowrealmvr.jpg",
            "description": "Relive your favorite moments from Yu-Gi-Oh with the help of a duel disk, an Arduino, some RFID chips, and good ol' Unity3D.",
            "links": [
              {
                "text": "video",
                "href": "https://www.youtube.com/watch?v=jfY9KvvZufw&feature=youtu.be"
              },
              {
                "text": "article",
                "href": "https://news.mlh.io/shadowrealmvr-12-15-2015"
              },
              {
                "text": "github",
                "href": "https://github.com/9/ShadowRealmVR"
              }
            ]
          },
          {
            "title": "PhoneWtf",
            "image": "images/phonewtf.png",
            "description": "A webapp that allows you to prank your friends and family with mysterious phone calls.",
            "links": [
              {
                "text": "try it",
                "href": "https://phone.wtf"
              },
              {
                "text": "github",
                "href": "https://github.com/nickgirardo/PhoneWtf"
              }
            ]
          },
          {
            "title": "seenIt",
            "image": "images/seenit.png",
            "description": "A webapp for adding scenic stops to any roadtrip.",
            "links": [
              {
                "text": "try it",
                "href": "https://seenit-ru.herokuapp.com"
              },
              {
                "text": "github",
                "href": "https://github.com/bigolu/seenIt"
              }
            ]
          },
          {
            "title": "Hackerspace Print Queue",
            "image": "images/hackerspace-print-queue.png",
            "description": "A webapp that allows people to request 3D prints online for the 3D printer at the Hackerspace.",
            "links": [
              {
                "text": "Hackerspace",
                "href": "http://hackerspace.cs.rutgers.edu/index.php"
              },
              {
                "text": "github",
                "href": "https://github.com/bigolu/Hackerspace-Print-Queue"
              }
            ]
          },
          {
            "title": "CaveHub",
            "image": "images/cavehub.jpg",
            "description": "A chrome extension that gives you information for whats going on around the best computer lab ever. Includes bus times, weather, and who's working.",
            "links": [
              {
                "text": "CAVE",
                "href": "https://www.cs.rutgers.edu/resources/cave"
              },
              {
                "text": "try it",
                "href": "https://chrome.google.com/webstore/detail/cavehub/nfjldjkhghgdaabjmcffhhpkfpmjdckd"
              },
              {
                "text": "github",
                "href": "https://github.com/bigolu/CaveHub"
              }
            ]
          },
          {
            "title": "HackBingo",
            "image": "images/hackbingo.png",
            "description": "A bingo game for hackathons!",
            "links": [
              {
                "text": "play",
                "href": "https://hack-bingo.herokuapp.com"
              },
              {
                "text": "github",
                "href": "https://github.com/bigolu/Hackathon-Bingo"
              }
            ]
          },
          {
            "title": "RanchBot",
            "image": "images/ranchbot.png",
            "description": "A bot that makes daily posts to the Ranch Facebook page with a ranchy quote.",
            "links": [
              {
                "text": "R a n c h",
                "href": "https://www.facebook.com/raaanchhh"
              },
              {
                "text": "github",
                "href": "https://github.com/bigolu/RanchBot"
              }
            ]
          }
        ]
      }
    ]
  }
}