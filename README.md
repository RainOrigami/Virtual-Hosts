# Orphaned

Send pull requests for fixes or contact me on Discord @rainorigami to adopt this project.

# Virtual-Hosts
Overwrite the Host HTTP header in Firefox requests to debug your web server or work around DNS restrictions.

This extension is available on Firefox extensions: https://addons.mozilla.org/firefox/addon/vhost-simulator/

## What is the purpose of this?

Often enough while waiting for DNS propagation or standing up a replacement site, developers edit the **hosts** file on their system to achieve the same effect.  This extension basically does the same thing without the hassle.

When detecting outgoing HTTP requests from your Firefox browser to the `VHost IP` it will rewrite the Host header to the `VHost Domain`. Any requests to sites other than the `VHost IP` are ignored, so browsing other sites won't be impacted.
