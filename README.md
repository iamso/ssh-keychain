# SSH Keychain
Inspired by Jeff Lindsay's [Keychain.io](https://github.com/progrium/keychain.io), but written for Node.js. This project is much simpler, it doesn't offer as many options as Keychain.io and it doesn't require any third-party storage. Oh and you will have to host it yourself ;)

Bash
----
Upload your default SSH key:

```bash
curl -sk ssh.your-domain.tld/<email>/upload | bash
```

Install your key into authorized_keys:

```bash
curl -sk ssh.your-domain.tld/<email>/install | bash
```

URLS
----

```
ssh.your-domain.tld/<email>/upload
ssh.your-domain.tld/<email>/install
ssh.your-domain.tld/<email>/fingerprint
```

Credits
-------
This project couldn't do what it does without these node packages:

- [express](https://www.npmjs.org/package/express)
- [body-parser](https://www.npmjs.org/package/body-parser)
- [ejs](https://www.npmjs.org/package/ejs)
- [nedb](https://www.npmjs.org/package/nedb)
- [ssh-fingerprint](https://www.npmjs.org/package/ssh-fingerprint)

License
-------

Copyright (c) 2014, Steve Ottoz

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.