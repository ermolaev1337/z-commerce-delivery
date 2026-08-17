# z-commerce delivery

The courier's side of the demo: the front end where a delivery is handed over and the
customer is checked a second time.

Part of [z-Commerce](https://github.com/ermolaev1337/z-commerce); it is not meant to run
on its own.

## What it demonstrates

The shop already verified the customer at checkout, but the courier has no reason to take
the shop's word for it — and no right to see the customer's data either. So the handover
repeats the verification independently: its own controller instance, its own Heimdall
verifier, its own database. The customer presents a proof again, from the same credential,
and the courier learns only whether it checks out.

A React app created with Create React App. It reads the order from the URL, opens a
websocket to its relay, and shows the verification result as it arrives.

Runs on [http://localhost:1337](http://localhost:1337).
