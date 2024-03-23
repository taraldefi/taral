Generated certs with [mkcert](https://github.com/FiloSottile/mkcert) go here

How to generate these local certificates: 

1. `mkcert localtariala.com api.localtariala.com app.localtariala.com db.localtariala.com seq.localtariala.com` will generate the `pem` and `key` certificates.

2. Rename them to `cert-key.pem` and `cert.pem`

3. Trust the certificates with `mkcert -install`. You can uninstall with `mkcert -uninstall`

4. Make sure to add these dns paths to the `/etc/hosts` file

e.g. add the following line: 

`127.0.0.1 localtariala.com api.localtariala.com app.localtariala.com seq.localtariala.com db.localtariala.com`

