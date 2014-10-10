# The Taggregator

Aggregates a standard JSON tag payload that can be hosted anywhere, so that anybody can compile a "master list" of tags and corresponding URLs.

I invented it so that the universe could tag GIFs on bukk.it, but I'm pretty sure nobody else will ever find a use for this.

## The Payload

Payloads can be published either as tag-first or URL-first, depending on how you like to tag your bukk.its:

### Tag-first JSON

Keep a master list of tags and just add URLs to them. An aggregator will parse this file into more or less the same format for lookups-by-tag. Note that no `http://` is required.

```json
{
  "tags": {
    "wednesday": [
      "bukk.it/weds.gif",
      "floops.io/sleepy.gif"
    ],
    "marcotte": [
      "bukk.it/thatssomarcotte.gif"
    ],
    "yee": [
      "bukk.it/thatssomarcotte.gif",
      "bukk.it/chinhands.jpg"
    ],
    "cat": [
      "bukk.it/mandybrown.gif"
    ]
  }
}
```

### URL-first JSON

For folks who look at a GIF and are all, "This is what the tags should be for this GIF."

```json
{
  "urls": {
    "bukk.it/weds.gif": [
      "wednesday", "weds", "dog"
    ],
    "bukk.it/thatssomarcotte.gif": [
      "name", "yee", "tangentialism", "marcotte"
    ],
    "bukk.it/chinhands.jpg": [
      "yee", "tangentialism", "chinhands"
    ],
    "bukk.it/mandybrown.gif": [
      "name", "mandy", "cat", "wtf"
    ]
  }
}
```

### YOLO Hybrid JSON

Can't decide? Attach URLs to tags _and_ tags to URLs. A compliant server will parse them both correctly into a sane lookup table.

```json
{
  "tags": {
    "bird": [
      "http://bukk.it/bigbirdwtf.gif",
      "http://bukk.it/srslyfuckbirds.jpg",
      "http://bukk.it/pigeons.gif"
    ],
    "cat": [
      "http://bukk.it/cat.png",
      "http://bukk.it/catbus2.gif",
      "http://bukk.it/dramacat.gif",
    ],
    "dog": [
      "http://www.misatkes.com/sowwy.png"
    ]
  },
  "urls": {
    "http://bukk.it/pbbt.jpg": ["dog", "tongue", "pbbt"],
    "http://bukk.it/fuckyoucat.jpg": ["fuck"],
    "bukk.it/weds.gif": ["wednesday", "weds", "dog"],
    "bukk.it/thatssomarcotte.gif": ["name", "yee", "tangentialism", "marcotte"],
    "bukk.it/chinhands.jpg": ["yee", "tangentialism", "chinhands"],
    "bukk.it/mandybrown.gif": ["name", "mandy", "cat", "wtf"],
    "http://bukk.it/3d.jpg": ["dog", "3d", "movie"],
    "http://bukk.it/%5e_%5e.gif": ["adventuretime", "iceking", "eyebrows"],
    "http://bukk.it/abedgun.gif": ["community", "abed"],
    "http://bukk.it/abedhayyy.gif": ["community", "abed"],
    "http://bukk.it/above.jpg": ["cat", "bowtie", "shit"],
    "http://bukk.it/absolutely.gif": ["yes"],
    "http://bukk.it/alsohowidowebdesign.gif": ["howido", "bugs", "car"],
    "http://bukk.it/angrydome.gif": ["professor", "angry", "futurama"],
    "http://bukk.it/annodomini.gif": ["polarbear", "bear", "time"],
    "http://bukk.it/spider-smokey.jpg": ["spidey"],

  }
}
```

