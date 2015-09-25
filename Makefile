deploy:
	make -C frontend/ build
	rsync -av frontend/dist/* sh@codedump.ch:/srv/http/postcard.codedump.ch/htdocs/
	rsync -av --exclude=uploads backend/* sh@codedump.ch:/srv/http/postcard.codedump.ch/backend/

