---
title: "Does neural synchrony imply image familiarity in an ant's brain?"
date: '2023-12-15'
excerpt: "Can we use an ant-inspired spiking neural network as an image 'familiarity' measure - and what does it tell us about ant navigation?"
tags: ["AI", "programming", "project"]
featured: true
---

Ants use visual information to quickly and accurately learn routes through their environment, despite a small brain and a low-resolution visual system. This navigation may be driven by a search for familiarity between a current view and the views previously experienced along the target route. There is little consensus on how this familiarity measure is implemented, but a recently proposed general familiarity measure, whereby an input history is encoded in a spiking neural network and the synchrony of spike timing is measured for a new input, seems promising. This project evaluates the use of this measure by extending it to a basic navigation task, using real images and various metrics. Its performance is found to be relatively weak, but experimental shortcomings and the plausibility of the method show that further investigation is warranted.

<object data="/misc/thesis.pdf" type="application/pdf" width="100%" height="700px">
    <embed src="/misc/thesis.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="/misc/thesis.pdf">Download PDF</a>.</p>
    </embed>
</object>

<iframe src="https://www.youtube.com/embed/cJIfgjZyjng" title="Spiking neural network video" width="100%" height="300px"></iframe>