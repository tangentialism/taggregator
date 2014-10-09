# The Taggregator

Aggregates a standard JSON tag payload that can be hosted anywhere, so that anybody can compile a "master list" of tags and corresponding URLs.

I invented it so that the universe could tag GIFs on bukk.it, but I'm pretty sure nobody else will ever find a use for this.

## The Payload

Payloads can be published either as tag-first or URL-first, depending on how you like to tag your bukk.its:

### Tag-first JSON

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

