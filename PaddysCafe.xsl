<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<table id="menuTable" border="5" class="indent">
    <thead>
        <tr>
            <th>Select</th>
            <th>Item</th>
            <th>Price</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <xsl:for-each select="//section">
            <tr>
                <td colspan="4">
                    <xsl:value-of select="@name" />
                </td>
            </tr>
            <xsl:for-each select="entry">
                <tr id="{position()}">
                    <xsl:attribute name="vegetarian">
                        <xsl:value-of select="boolean(@vegetarian)" />
                    </xsl:attribute>
                    <td align="left">
                        <input name="item0" type="checkbox" />
                    </td>
                    <td>
                        <xsl:value-of select="item" />
                    </td>
                    <td align="center">
                        <xsl:value-of select="price" />

                    </td>
                    <td align="right">
                        <xsl:value-of select="type" />
                        
                    </td>
                </tr>
            </xsl:for-each>
        </xsl:for-each>
    </tbody>
</table>
</xsl:template>
</xsl:stylesheet>