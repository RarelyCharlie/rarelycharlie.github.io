---
layout: default
title: EMDR
feedback: https://www.7cups.com/@RarelyCharlie
---
<style>
{% include emdr.css %}}
</style>
<script>
{% include emdr.js %}}
</script>
## EMDR
<p id="status"></p>
<div id="lightbox">
<div id="lights">
<button id="control" onclick="Pinger.toggle()"><i id="playpause" title="Play" class="fa fa3x fa-play"></i></button>
<div id="light"></div>
</div>
</div>
<label for="speed">Speed: <span><span id="speed-value">60 </span> <i>per</i> minute</span></label>
<input id="speed" type="range" min="30" max="150" value="60" step="5" oninput="Pinger.vary('speed', this)">

<p id="onoff">
<button id="mute" title="Mute the sound" onclick="UI.toggle(this)"><i class="fa fa-volume-off"></i></button>
<button id="full" title="Run in full screen" onclick="UI.toggle(this)"><i class="fa fa-arrows-alt"></i></button>
</p>

<div id="settings-tab">
<button id="settings-button" onclick="Pinger.togglesettings(this)"><i class="fa fa-cog"></i> Settings <i class="fa fa-caret-down"></i></button>
</div>
<div id="settings">

<div id="allow-remote">
<h4>Pairing</h4>
<div id="mode-radio" onchange="Remote.setmode(event.target.value)">
<label for="mode-single"><input name="mode" id="mode-single" type="radio" value="0" checked> None</label>
<label for="mode-client"><input name="mode" id="mode-client" type="radio" value="1"> Client</label>
<label for="mode-therapist"><input name="mode" id="mode-therapist" type="radio" value="2"> Therapist</label>
</div>
<label for="pin" class="disabled">Session PIN:
<input id="pin" disabled onkeyup="Remote.setpin(this.value)">
<i id="connect-wait" class="fa fa-spin fa-spinner hidden"></i>
<span id="client-connected" class="hidden"><i class="fa fa-check"></i> OK</span>
<span id="alert"></span>
</label>
<hr>
</div>

<h4 id="sound">Sound</h4>
<label for="pitch">Pitch: <span><span id="pitch-value">a′</span></span>
<input id="pitch" type="range" min="-12" max="24" value="0" step="1" oninput="Pinger.vary('pitch', this)"></label>
<label for="volume">Volume: <span><span id="volume-value">80</span>%</span>
<input id="volume" type="range" min="0" max="1" value=".8" step=".05" oninput="Pinger.vary('volume', this)"></label>
<!-- label for="mute"><input type="checkbox" id="mute" onchange="Pinger.mute(this.checked)"> Mute</label -->
<hr>

<h4 id="movement">Eye movement</h4>
<label for="size" class="disabled">Size: <span><span id="size-value">20</span>%</span>
<input id="size" type="range" min="20" max="200" value="40" step="10" oninput="Pinger.vary('size', this)" disabled></label>
<label for="hue" class="disabled">Color: <span><span id="hueValue">196°</span></span>
<input id="hue" type="range" min="0" max="360" value="196" step="10" oninput="Pinger.vary('hue', this)" disabled></label>
<!-- label for="fullscreen" class="disabled"><input type="checkbox" id="fullscreen" disabled onchange="Pinger.movement(this.checked)"> Run full screen when Settings are closed</label -->
<hr>

<p id="help">For instructions, see: <a href="#">How to: Use EMDR</a></p>
</div>
