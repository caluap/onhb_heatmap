# ONHB Heatmap (but not really a heatmap)

With the end of ONHB11's first registration period and start of its second period, the communication team asked us to create an image to mark the occasion.

We created two simple scripts: the first asked Google Map's API for the coordinates of each city where there was at least one team (this was done in Python/Jupyter Notebook).

The second script plays with these points. In the end, we ended up plotting each team as a faint pink dot on the map, asking each point to slowly “walk” towards Campinas on the map — the place where the final round of the event takes place.

The result seems a bit particle-collidery, but it kind of works: the image makes clear the uneven proportion of teams in the coastal regions, specially São Paulo state and Northeast region while at the same time having a kind of electric feel that seems appropriate for the event.

![Generated image with some light post processing](https://raw.githubusercontent.com/caluap/onhb_heatmap/master/heatmap.png)
